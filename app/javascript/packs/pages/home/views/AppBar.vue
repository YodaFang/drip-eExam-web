<template>
    <v-app-bar app dense fixed dark
      id="app-bar-header"
      max-height="40"
      class="mx-auto"
      color="blue lighten-1"
    >
      <v-icon>mdi-water-outline</v-icon>

      <h4> 点 滴 云 学 习</h4>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <SignInUpModal />

      <v-chip
      outlined
      to="/user"
      >
      Hi {{ userInfo.name }}
      </v-chip>
    </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeaderBar',

  components: {
      SignInUpModal: () => import('@/components/SignInUpModal'),
  },

  data: () => ({
  }),
  computed: {
    userInfo(){
      return this.$root.$data.userInfo;
    },
    isLogin(){
      return this.$root.$data.isLogin;
    }
  }
}

</script>
