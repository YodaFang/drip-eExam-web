<template>
<v-card style="margin:0 auto;" max-width="1260px">
  <v-app id="task-app">
    <v-system-bar app dark color="blue lighten-1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <h3 class="white--text">任务 - 测试  已完成 12/30</h3>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-navigation-drawer v-model="drawer" absolute app>
      <v-list expand>
        <v-list-item-group mandatory color="success" v-model="selectedItem">
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
      <WordListCard v-if="selectedContent.type == 1" :content="selectedContent" :hasMore="hasMore" :next="next" :back="back"/>
      <SingleOptionCard v-else-if="selectedContent.type == 2" :content="selectedContent" :hasMore="hasMore" :next="next" :back="back"/>
      <div style="height:80px;"></div>
    </v-main>
    <v-footer color="transparent" max-width="190" class="mx-auto" padless fixed>
      <v-row justify="center" color="rgba(0, 0, 0, .3)" no-gutters>
        <v-progress-circular :rotate="90" :size="85" :width="10" :value="value1" color="primary">{{ value1 }}</v-progress-circular>
        <v-spacer></v-spacer>
        <v-progress-circular :rotate="90" :size="85" :width="10" :value="value2" color="purple">{{ value2 }} / 100</v-progress-circular>
      </v-row>
    </v-footer>
  </v-app>
</v-card>
</template>

<script>
export default {
  components: {
    LoadingDialog: () => import('@/components/LoadingDialog'),
    AlertSnackbar: () => import('@/components/AlertSnackbar'),
    SingleOptionCard: () => import('./views/SingleOptionCard'),
    WordListCard: () => import('./views/WordListCard'),
  },
  data(){
    return {
      selectedItem: 0,
      selectedContent: {},
      hasBack: false,
      hasMore: true,
      drawer: null,
      value1: 100,
      value2: 0,
      breadcrumbs: [],
      menuList: this.$root.$data.getIndexArray(),
    }
  },
  beforeCreate(){
    this.$root.$data.init();
  },
  mounted(){
    this.setCurrent();

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
    menuTitle(secIdx){
      return this.$root.$data.getSection(secIdx).title;
    },
    subMenuTitle(secIdx, itemIdx){
      return itemIdx + 1;
    },
    setCurrent(){
      this.selectedItem = this.$root.$data.getCurrentIdx();
      this.selectedContent = this.$root.$data.getCurrentItem();
      this.hasMore = this.$root.$data.hasNext();
      this.hasBack = this.$root.$data.hasBack();
      this.breadcrumbs = this.$root.$data.getBreadcrumbs();
    },
    selectItem(secIdx, itemIdx){
      if(this.$root.$data.setCurrent(secIdx, itemIdx)){
        this.setCurrent();
      }
    },
    next(){
      if(this.$root.$data.next()){
        this.expandMenu();
        this.setCurrent();
      }
    },
    back(){
      if(this.$root.$data.back()){
        this.expandMenu();
        this.setCurrent();
      }
    },
    expandMenu(){
      let idx = this.$root.$data.getCurrentSecIdx();
      let menuGroup = document.getElementById(`menu-group-${idx}`);
      if(!menuGroup.classList.contains('v-list-group--active')) document.getElementById(`menu-item-${idx}`).click();
    },
    sectionList(){
      return this.$root.$data.getSections();
    },
  },
}
</script>
