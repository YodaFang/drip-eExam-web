<template>
  <v-app>
    <AppHeaderBar />
    <v-main>
      <AlertSnackbar />
      <v-card class="mx-auto" max-width="1260">
        <router-view />
      </v-card>
      <LoadingDialog />
    </v-main>
    <AppFooterBar />
    <AppSettings />
  </v-app>
</template>

<script>
export default {
  name: 'HomeApp',
  components: {
    AppHeaderBar: () => import('./views/AppBar'),
    AppSettings: () => import('./views/Settings'),
    AppFooterBar: () => import('./views/Footer'),
    LoadingDialog: () => import('@/components/LoadingDialog'),
    AlertSnackbar: () => import('@/components/AlertSnackbar'),
  },
  mounted() {
  },
  computed: {
  }
}
</script>
