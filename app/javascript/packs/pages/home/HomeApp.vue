<template>
  <v-app>
    <AppHeaderBar />
    <v-main>
      <AlertSnackbar />
      <v-card class="mx-auto" :max-width="mainMaxWidth">
        <router-view />
      </v-card>
    </v-main>
    <AppFooterBar />
    <AppSettings />
    <LoadingDialog />
  </v-app>
</template>

<script>

export default {
  name: 'HomeApp',
  data(){
    return {
      mainMaxWidth: this.$root.$data.maxWidth,
    }
  },
  components: {
    AppHeaderBar: () => import('./views/AppBar'),
    AppSettings: () => import('./views/Settings'),
    AppFooterBar: () => import('./views/Footer'),
    LoadingDialog: () => import('@/components/LoadingDialog'),
    AlertSnackbar: () => import('@/components/AlertSnackbar'),
  },
  beforeCreate(){
    this.$root.$data.init();
  },
  mounted(){
  },
  methods: {
  }
}
</script>
