<template>
  <div class="text-center">
    <v-snackbar
      v-model="isShowAlerts"
      timeout="-1"
      :multi-line="true"
      top
    >
      <v-alert type="error"> {{ errorMessages() }} </v-alert>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          icon
          v-bind="attrs"
          @click="isShowAlerts=false"
        >
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'AlertSnackbar',
  computed: {
    isShowAlerts:{
      get(){
        return this.$root.$data.isShowAlerts;
      },
      set(v){
        this.$root.$data.isShowAlerts = v;
      }
    }
  },
  methods: {
    errorMessages() {
      return this.$root.$data.errorMessages
    },
  }
}
</script>