<template>
<v-app id="inspire">
  <v-system-bar app dark color="blue lighten-1">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <h3 class="white--text">任务 - 测试  已完成 12/30</h3>
    <v-spacer></v-spacer>
  </v-system-bar>
  <v-navigation-drawer v-model="drawer" app color="grey lighten-4">
    <v-list flat v-for="(s, j) in listGroups()" :key="j">
      <v-list-group
        v-if="subListItems(s).length > 0"
      >
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title v-text="s.title"></v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item-group>
          <v-list-item
            v-for="(c, i) in subListItems(s)"
            :key="i"
            link
            dense
            class="ml-6" 
          >
            <v-list-item-title v-text="c.title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-check</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>
      <v-list-item-group v-else  v-model="selectedItem" color="success">
        <v-list-item link>
          <v-list-item-title class="ml-4" v-text="s.title"></v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <v-card flat max-width="580px">
      <v-breadcrumbs :items="items"></v-breadcrumbs>
      <v-divider></v-divider>
      <v-card-text>
        <span class="headline">Search for Public APIs</span>
          <v-radio-group v-model="ex8">
            <v-radio label="primary" color="primary" value="primary"></v-radio>
            <v-radio label="secondary" color="secondary" value="secondary"></v-radio>
            <v-radio label="success" color="success" value="success"></v-radio>
            <v-radio label="info" color="info" value="info"></v-radio>
          </v-radio-group>
      </v-card-text>
    </v-card>
    <v-card flat>
      <v-breadcrumbs :items="items"></v-breadcrumbs>
      <v-divider></v-divider>
      <v-card-text v-for="(item, index) in wordList()" :key="index">
        <v-row class="mb-0" v-on:dblclick="show = !show">
          <v-col cols="10"><p class="title"> <strong>{{ item[0] }}</strong> {{ item[1] }} <v-divider vertical/>{{ item[2] }} </p></v-col>
          <v-col cols="2" align="right"><v-icon @click="show = !show">mdi-dots-vertical</v-icon></v-col>
        </v-row>
        <v-expand-transition >
          <div v-show="show">
            <v-card-text>
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </div>
        </v-expand-transition>
        <v-divider></v-divider>
      </v-card-text>
    </v-card>
  </v-main>
  <v-footer
    color="transparent"
    max-width="190"
    class="mx-auto"
    padless
    fixed
  >
    <v-row
      justify="center"
      color="rgba(0, 0, 0, .3)"
      no-gutters
    >
      <v-progress-circular
      :rotate="90"
      :size="85"
      :width="10"
      :value="value1"
      color="primary"
    >
      {{ value1 }}
    </v-progress-circular>
    <v-spacer></v-spacer>
    <v-progress-circular
      :rotate="0"
      :size="85"
      :width="10"
      :value="value2"
      color="purple"
    >
      {{ value2 }} / 100
    </v-progress-circular>
    </v-row>
  </v-footer>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      selectedItem: 1,
      drawer: null,
      ex8: 'primary',
      value1: 100,
      value2: 0,
      items: [
        {
          text: '单选测试',
          disabled: true,
        },
        {
          text: '1',
          disabled: true,
        },
      ],
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.value1 === 0) {
        return (this.value1 = 100)
      }
      this.value1 -= 10
    }, 1000)
  },
  methods: {
    listGroups() {
      return this.$root.$data.sections;
    },
    subListItems(section) {
      return section.items && section.items.slice(1);
    },
    wordList(section) {
      return this.$root.$data.sections[0].items[0].content
    }
  },
}
</script>
