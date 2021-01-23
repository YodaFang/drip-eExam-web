<template>
  <div class="text-center">
    <v-overlay :value="isShowLoading">
      <v-progress-circular indeterminate color="blue light-4" width="10px" size="88px" />
    </v-overlay>
  </div>
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