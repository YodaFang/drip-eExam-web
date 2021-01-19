<template>
  <v-dialog v-model="isShowLoading" fullscreen>
  <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);">
    <v-layout justify-center align-center>
      <v-progress-circular
        indeterminate
        color="primary">
      </v-progress-circular>
    </v-layout>
  </v-container>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoadingDialog',
  computed: {
    isShowLoading:{
      get(){
        return this.$root.$data.isShowLoading();
      },
      set(v){
        this.$root.$data.setShowLoading(v);
      }
    }
  }
}
</script>