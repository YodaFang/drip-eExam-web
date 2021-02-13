<template>
  <v-card flat>
    <WordRow v-for="(item, index) in content" :key="index" :word="item"/>
  </v-card>
</template>
<script>
export default {
  components: {
    WordRow: () => import('./WordRow'),
  },
  props: {
    content: { type: Object, required: true },
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