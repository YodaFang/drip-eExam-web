<template>
  <v-overlay :value="isShowLoading">
    <v-progress-circular indeterminate color="blue light-4" size="88" width="8"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'LoadingDialog',
  computed: {
    isShowLoading:{
      get(){
        return this.$root.$data.isShowLoading;
      },
      set(v){
        this.$root.$data.isShowLoading = v;
      }
    }
  }
}
</script>