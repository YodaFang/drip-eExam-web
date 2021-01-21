<template>
  <v-app>
    <AppHeaderBar />
    <v-main>
      <AlertSnackbar />
      <v-card class="mx-auto" :max-width="mainMaxWidth()">
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
  data: () => ({
    //mainMaxWidth: this.$root.$data.maxWidth,
  }),
  components: {
    AppHeaderBar: () => import('./views/AppBar'),
    AppSettings: () => import('./views/Settings'),
    AppFooterBar: () => import('./views/Footer'),
    LoadingDialog: () => import('@/components/LoadingDialog'),
    AlertSnackbar: () => import('@/components/AlertSnackbar'),
  },
  beforeCreate(){
  },
  mounted(){
    this.$root.$data.user.init();
  },
  methods: {
    mainMaxWidth() {
      return this.$root.$data.maxWidth;
    }
  }
}
</script>
