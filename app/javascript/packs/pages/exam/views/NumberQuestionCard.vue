<template>
  <v-card flat>
    <v-card-text>
      Number is : {{ number }}
    </v-card-text>
    <v-divider></v-divider>
    <NumericPad :initInputVal="number" :setInputVal="setNumberVal" />
  </v-card>
</template>
<script>
export default {
  components: {
    NumericPad: () => import('@/components/NumericKeypad.vue'),
  },
  data: () => ({
    number: "",
  }),
  methods: {
    setNumberVal(val) {
      this.number = val;
    },
  }
};
</script>
