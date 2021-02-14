<template>
<v-app id="task-app">
  <LoadingDialog />
  <SignInUpModal />
  <v-overlay v-once v-if="showConfirm && !showExam">
    <v-card class="mx-auto" max-width="680px" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            OVERLINE
          </div>
          <v-list-item-title class="headline mb-1">
            Headline 5
          </v-list-item-title>
          <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-btn outlined block text @click="loadExam()">
          开 始 测 试
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
  <v-card style="margin:0 auto;" max-width="1260px" v-else-if="!showConfirm && showExam">
    <AlertSnackbar />
    <v-system-bar app dark color="blue lighten-1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <h3 class="white--text">任务 - 测试  已完成 12/30</h3>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-navigation-drawer v-model="drawer" absolute app>
      <v-list expand>
        <v-list-item-group mandatory color="success" v-model="selectedIdx">
          <template v-once v-for="(m, j) in menuList">
            <v-list-group no-action eager v-if="m.length > 1" :key="j" :value="true" :id="`menu-group-${j}`">
              <template v-slot:activator>
                <v-list-item disabled inactive :id="`menu-item-${j}`">
                  <v-list-item-title><strong>{{menuTitle(j)}}</strong></v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item v-for="(idx, i) in m" :key="i" :value="idx" @click="selectItem(j, i)">
                <v-list-item-title>> {{subMenuTitle(j, i)}}</v-list-item-title>
              </v-list-item>
            </v-list-group>
            <v-list-item v-else :key="j" :value="m[0]" @click="selectItem(j, 0)">
              <v-list-item-title class="ml-4"><strong>{{menuTitle(j)}}</strong></v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <v-divider></v-divider>
      <v-card flat>
        <WordListCard v-if="selectedContent.type == 1" :content="selectedContent"/>
        <SingleOptionCard v-else-if="selectedContent.type == 2" :content="selectedContent" v-model="userAnswer"/>
        <NumberQuestion v-else-if="selectedContent.type == 3" :content="selectedContent" v-model="userAnswer"/>
        <v-divider></v-divider>
        <v-card-actions v-if="answerMode">
          <v-row class="m-0">
            <v-col cols="8"><v-btn v-if="hasMore" color="primary" text outlined block @click="next()" ><strong>Next</strong></v-btn></v-col>
            <v-col cols="4"><v-btn v-if="hasBack" text block outlined @click="back()" >Back</v-btn></v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <div style="height:80px;"></div>
    </v-main>
    <v-footer color="transparent" max-width="190" class="mx-auto" padless fixed>
      <v-row justify="center" color="rgba(0, 0, 0, .3)" no-gutters>
        <v-progress-circular :rotate="90" :size="85" :width="10" :value="value1" color="primary">{{ value1 }}</v-progress-circular>
        <v-spacer></v-spacer>
        <v-progress-circular :rotate="90" :size="85" :width="10" :value="value2" color="purple">{{ value2 }} / 100</v-progress-circular>
      </v-row>
    </v-footer>
  </v-card>
</v-app>
</template>

<script>
export default {
  components: {
    LoadingDialog: () => import('@/components/LoadingDialog'),
    AlertSnackbar: () => import('@/components/AlertSnackbar'),
    SingleOptionCard: () => import('./views/SingleOptionCard'),
    WordListCard: () => import('./views/WordListCard'),
    NumberQuestion: () => import('./views/NumberQuestionCard'),
    SignInUpModal: () => import('@/components/SignInUpModal'),
  },
  data(){
    return {
      showConfirm: false,
      showExam: false,
      selectedIdx: 0,
      selectedContent: {},
      hasBack: false,
      hasMore: true,
      drawer: true,
      value1: 100,
      value2: 0,
      breadcrumbs: [],
      menuList: [],
      answerMode: true,
      userAnswer: '',
    }
  },
  beforeCreate(){
    //this.$root.$data.init();
  },
  mounted(){
    this.$root.$data.isShowSignInUp = true;

    this.interval = setInterval(() => {
      if (this.value1 == 0) {
        this.value1 = 100;
        this.value2 = 0;
      }
      this.value1--;
      this.value2++;
    }, 3000);
  },
  computed: {
  },
  watch: {
  },
  methods: {
    loadExam(){
      this.$root.$data.exam.loadExamDetail();
      this.showConfirm = false;
      this.showExam = true;
      this.menuList = this.$root.$data.exam.getIndexArray();
      this.setCurrent();
    },
    menuTitle(secIdx){
      return this.$root.$data.exam.getSection(secIdx).title;
    },
    subMenuTitle(secIdx, itemIdx){
      return itemIdx + 1;
    },
    setCurrent(){
      this.selectedIdx = this.$root.$data.exam.getCurrentIdx();
      this.selectedContent = this.$root.$data.exam.getCurrentItem();
      this.hasMore = this.$root.$data.exam.hasNext();
      this.hasBack = this.$root.$data.exam.hasBack();
      this.breadcrumbs = this.$root.$data.exam.getBreadcrumbs();
    },
    selectItem(secIdx, itemIdx){
      if(this.$root.$data.exam.setCurrent(secIdx, itemIdx)){
        this.setCurrent();
      }
    },
    next(){
      console.log(this.userAnswer)
      if(this.$root.$data.exam.next()){
        this.expandMenu();
        this.setCurrent();
      }
    },
    back(){
      if(this.$root.$data.exam.back()){
        this.expandMenu();
        this.setCurrent();
      }
    },
    expandMenu(){
      let idx = this.$root.$data.exam.getCurrentSecIdx();
      let menuGroup = document.getElementById(`menu-group-${idx}`);
      if(!menuGroup.classList.contains('v-list-group--active')) document.getElementById(`menu-item-${idx}`).click();
    },
    sectionList(){
      return this.$root.$data.exam.getSections();
    },
  },
}
</script>
