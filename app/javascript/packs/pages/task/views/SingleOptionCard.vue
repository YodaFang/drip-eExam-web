<template>
  <v-card flat>
    <v-card-text>
      <span class="headline" v-text="item.title"></span>
        <v-radio-group v-model="answer" :disabled = "!answerMode">
          <v-radio v-for="(option, i) in item.options" :key="i" :label="option" :value="i"></v-radio>
        </v-radio-group>
    </v-card-text>
    <v-card-actions v-if="answerMode">
      <v-btn v-for="(action, i) in actions" :key="i" text dark outlined @click="action.exec(answer)" v-text="action.label"></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    answerMode: {
      type: Boolean,
      required: false,
      default: true
    },
  },
  data () {
    return {
      answer: null,
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>