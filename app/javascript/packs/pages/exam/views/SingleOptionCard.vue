<template>
  <v-card-text>
    <span class="text-h6" v-text="content.description"></span>
    <v-radio-group v-model="answer" :disabled="!answerMode">
      <v-radio v-for="(option, i) in content.options" :key="i" :label="option" :value="option"></v-radio>
    </v-radio-group>
  </v-card-text>
</template>
<script>
export default {
  props: {
    content: { type: Object, required: true },
    answerMode: { type: Boolean, required: false, default: true },
  },
  data () {
    return {
      answer: this.content.user_answer,
    }
  },
  mounted(){
    this.$emit('input', this.answer);
  },
  watch: {
    content(newVal, oldVal){
      this.answer = newVal.user_answer;
    },
    answer(newVal, oldVal){
      if(newVal == oldVal) return;
      this.$emit('input', this.answer);
    },
  },
  methods: {
  }
}
</script>