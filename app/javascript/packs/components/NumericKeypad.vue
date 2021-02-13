<template>
  <div class="keypad-container">
    <template v-for="n in 12">
      <div :key="n" class="keypad-flex keypad-class">
        <div class="keypad" v-if="n < 10" @click="appendInput(n);">
          <v-btn class="keypad-center text-h5" text block>{{ n }}</v-btn>
        </div>
        <div class="keypad" v-else-if="n == 10" @click="resetInput()">
          <v-btn class="keypad-center font-weight-bold text-h4" text block>&copy;</v-btn>
        </div>
        <div class="keypad" v-else-if="n == 11" @click="appendInput(0);">
          <v-btn class="keypad-center text-h5" text block>0</v-btn>
        </div>
        <div class="keypad" v-else-if="n == 12" @click="delInput(n);">
          <v-btn class="keypad-center font-weight-bold text-h4" text block>&laquo;</v-btn>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputStr: '',
    }
  },
  props: {
    initInputVal: { type: String, required: true },
    setInputVal: { type: Function, required: true },
  },
  mounted(){
    this.inputStr = this.initInputVal || '';
  },
  methods: {
    appendInput(number){
      if(number == 0 && this.inputStr.length == 0) return;
      this.inputStr = this.inputStr + number;
      this.setInputVal(this.inputStr);
    },
    delInput(){
      this.inputStr = this.inputStr.slice(0, -1);
      this.setInputVal(this.inputStr);
    },
    resetInput(){
      this.inputStr = '';
      this.setInputVal(this.inputStr);
    },
  },
};
</script>

<style>
.keypad-class {
  color: #888;
  background: #fafafa;
  border: 0.004rem solid #eaeaea;
}

.keypad-container {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  min-width: 0;
  flex-direction: row;
}

.keypad-flex {
  flex-basis: 33%;
  flex-grow: 0;
  max-width: 33%;
  min-height: 4rem;
}

.keypad {
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: center;
  margin: 0 auto;
}

.keypad-center {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>