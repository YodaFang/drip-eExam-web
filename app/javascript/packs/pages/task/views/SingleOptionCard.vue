<template>
  <v-card flat max-width="800px">
    <v-card-text>
      <span class="text-h6" v-text="content.title"></span>
        <v-radio-group v-model="answer" :disabled="!answerMode">
          <v-radio v-for="(option, i) in content.options" :key="i" :label="option" :value="i"></v-radio>
        </v-radio-group>
    </v-card-text>
    <v-card-actions v-if="answerMode">
      <v-row class="m-0">
        <v-col cols="8"><v-btn color="primary" text outlined block @click="step++" ><strong>Next</strong></v-btn></v-col>
        <v-col cols="4"><v-btn text block outlined @click="step--" >Back</v-btn></v-col>
      </v-row>
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