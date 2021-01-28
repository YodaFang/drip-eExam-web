<template>
  <v-card-text>
    <v-row class="m-0" v-on:dblclick="triggleShowMore()">
      <v-col cols="10"><p class="text-h6"> <strong>{{ word[0] }}</strong> {{ word[1] }} <v-divider vertical/>{{ word[2] }}</p></v-col>
      <v-col cols="2" align="right"><v-icon @click="triggleShowMore()">mdi-dots-vertical</v-icon></v-col>
    </v-row>
    <v-expand-transition >
      <div v-show="showMore">
        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-divider></v-divider>
  </v-card-text>
</template>
<script>
export default {
  props: {
    word: {
      type: Array,
      required: true
    },
  },
  data () {
    return {
      showMore: false,
    }
  },
  mounted () {
  },
  methods: {
    triggleShowMore(){
      this.showMore = !this.showMore;
    }
  }
}
</script>