<template>
  <v-card flat>
    <v-card-text v-for="(item, index) in wordList" :key="index">
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
</template>
<script>
export default {
  props: {
    wordList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>