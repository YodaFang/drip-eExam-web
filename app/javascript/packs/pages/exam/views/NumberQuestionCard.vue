<template>
  <v-card flat>
    <v-card-text>
      <span class="text-h6">Number is = <v-text-field readonly v-model="number" /></span>
      <NumericPad :initInputVal="number" :setInputVal="setNumberVal" />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions v-if="answerMode">
      <v-row class="m-0">
        <v-col cols="8"><v-btn v-if="hasMore" color="primary" text outlined block @click="next()" ><strong>Next</strong></v-btn></v-col>
        <v-col cols="4"><v-btn text block outlined @click="back()" >Back</v-btn></v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  components: {
    NumericPad: () => import('@/components/NumericKeypad.vue'),
  },
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
      number: '',
    }
  },
  methods: {
    setNumberVal(val) {
      this.number = val;
    },
  }
};
</script>
