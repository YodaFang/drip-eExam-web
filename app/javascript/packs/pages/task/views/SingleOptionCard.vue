<template>
  <v-card flat>
    <v-card-text>
      <span class="headline" v-text="content.title"></span>
        <v-radio-group v-model="answer" :disabled="!answerMode">
          <v-radio v-for="(option, i) in content.options" :key="i" :label="option" :value="i"></v-radio>
        </v-radio-group>
    </v-card-text>
    <v-card-actions v-if="answerMode">
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    content: {
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