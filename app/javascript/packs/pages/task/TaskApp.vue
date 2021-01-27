<template>
<v-card style="margin:0 auto;" max-width="1260px">
<v-app id="inspire">
  <v-system-bar app dark color="blue lighten-1">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <h3 class="white--text">任务 - 测试  已完成 12/30</h3>
    <v-spacer></v-spacer>
  </v-system-bar>
  <v-navigation-drawer v-model="drawer" absolute app color="grey lighten-4">
    <v-list flat>
      <v-list-item-group mandatory color="success" v-model="selectedItem">
        <template v-once v-for="(s, j) in sectionList()">
          <v-list-group v-if="subListItems(s).length > 1" :key="j" :value="true" no-action>
            <template v-slot:activator>
              <v-list-item disabled inactive :link="false">
                <v-list-item-title><strong>{{s.title}}</strong></v-list-item-title>
              </v-list-item>
            </template>
              <v-list-item v-for="(c, i) in subListItems(s)" :key="i" :value="listItemValue(j, i)" @click="selectItem(listItemValue(j, i))">
                <v-list-item-title>--> {{i+1}}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon>mdi-check</v-icon>
                </v-list-item-icon>
              </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="j" :value="listItemValue(j, 0)" @click="selectItem(listItemValue(j, 0))">
            <v-list-item-title class="ml-4"><strong>{{s.title}}</strong></v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    <v-divider></v-divider>
    <WordListCard v-if="selectedContent.type == 1" :content="selectedContent.content" :hasMore="hasMore" :next="next" :back="back"/>
    <SingleOptionCard v-else-if="selectedContent.type == 2" :content="selectedContent.content" :hasMore="hasMore" :next="next" :back="back"/>
    <div style="height:80px;"></div>
  </v-main>
  <v-footer color="transparent" max-width="190" class="mx-auto" padless fixed>
    <v-row justify="center" color="rgba(0, 0, 0, .3)" no-gutters>
      <v-progress-circular :rotate="90" :size="85" :width="10" :value="value1" color="primary">
      {{ value1 }}
      </v-progress-circular>
      <v-spacer></v-spacer>
      <v-progress-circular :rotate="0" :size="85" :width="10" :value="value2" color="purple">
        {{ value2 }} / 100
      </v-progress-circular>
    </v-row>
  </v-footer>
</v-app>
</v-card>
</template>

<script>
export default {
  components: {
    SingleOptionCard: () => import('./views/SingleOptionCard'),
    WordListCard: () => import('./views/WordListCard'),
  },
  data () {
    return {
      selectedItem: 0,
      selectedContent: {},
      hasMore: true,
      drawer: null,
      value1: 100,
      value2: 0,
      breadcrumbs: [],
    }
  },
  mounted () {
    this.$root.$data.init();
    this.setCurrent();

    this.interval = setInterval(() => {
      if (this.value1 === 0) {
        return (this.value1 = 100)
      }
      this.value1 -= 10
    }, 1000)
  },
  computed: {
  },
  watch: {
  },
  methods: {
    setCurrent(){
      this.selectedItem = this.$root.$data.getCurrentIdx();
      this.selectedContent = this.$root.$data.getCurrentItem();
      this.hasMore = this.$root.$data.hasNext();
      this.breadcrumbs = this.$root.$data.getBreadcrumbs();
    },
    selectItem(value){
      if(this.$root.$data.setCurrentIdx(value)){
        this.setCurrent();
      }
      console.log(this.selectedItem)
    },
    next() {
      if(this.hasMore){
        this.$root.$data.next();
        this.setCurrent();
      }
    },
    back() {
      console.log('back................');
    },
    sectionList() {
      return this.$root.$data.getSections();
    },
    listItemValue(sectionIdx, itemIdx) {
      return this.$root.$data.generateIdx(sectionIdx, itemIdx);
    },
    subListItems(section) {
      return section.items && section.items;
    },
  },
}
</script>
