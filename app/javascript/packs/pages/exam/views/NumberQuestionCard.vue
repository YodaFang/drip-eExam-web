<template>
  <v-card flat>
    <v-card-text>
      Number is : {{ number }}
    </v-card-text>
    <v-divider></v-divider>
    <NumericPad :onInput="onInput" :onDelete="onDelete" :onReset="onReset" :show="showKeypad"/>
  </v-card>
</template>
<script>
export default {
  name: "app-numeric-keypad",
  components: {
    NumericPad: () => import('@/components/NumericKeypad.vue'),
  },
  data: () => ({
    number: "",
    maxLength: 6,
    showKeypad: true
  }),
  methods: {
    onInput(key) {
      this.number = (this.number + key).slice(0, this.maxLength);
    },
    onDelete() {
      this.number = this.number.slice(0, this.number.length - 1);
    },
    onReset() {
      this.number = "";
    }
  }
};
</script>
