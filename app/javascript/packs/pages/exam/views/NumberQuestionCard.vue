<template>
  <v-card-text>
    <span class="text-h6">{{content.description}} <v-text-field readonly v-model="number" /></span>
    <NumericPad :initInputVal="number" :setInputVal="setNumberVal" />
  </v-card-text>
</template>
<script>
export default {
  components: {
    NumericPad: () => import('@/components/NumericKeypad'),
  },
  props: {
    content: { type: Object, required: true },
    answerMode: { type: Boolean, required: false, default: true },
  },
  data () {
    return {
      number: '',
    }
  },
  watch: {
    content(newVal, oldVal){
      this.number = newVal.user_answer || null;
    },
    answer(newVal, oldVal){
      if(newVal == oldVal) return;
      this.$emit('input', this.number);
    },
  },
  methods: {
    setNumberVal(val) {
      this.number = val;
    },
  }
};
</script>
