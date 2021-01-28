<template>
  <v-card flat>
    <WordRow v-for="(item, index) in content" :key="index" :word="item"/>
    <v-card-actions>
      <v-row class="m-0">
        <v-col :cols="hasMore ? 8 : 0"><v-btn color="primary" text outlined block @click="next()" ><strong>Next</strong></v-btn></v-col>
        <v-col><v-btn text block outlined @click="back()" >Back</v-btn></v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  components: {
    WordRow: () => import('./WordRow'),
  },
  props: {
    content: {
      type: Array,
      required: true
    },
    hasMore: {
      type: Boolean,
      required: true,
      default: true
    },
    next: {
      type: Function,
      required: true,
    },
    back: {
      type: Function,
      required: true,
    },
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>