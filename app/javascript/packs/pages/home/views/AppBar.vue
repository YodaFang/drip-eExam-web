<template>
  <v-app-bar app dense fixed id="app-bar-header" max-height="40px" class="mx-auto">
    <v-icon>mdi-water-outline</v-icon>
    <h4> 点 滴 云 学 习</h4>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <UserProfileModal />
    <v-menu v-if="isLogin" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-chip v-bind="attrs" v-on="on" outlined class="font-weight-bold">
          <v-icon left>mdi-account-circle-outline</v-icon>
          你好 {{ userName }}
          <v-icon right>mdi-dots-vertical</v-icon>
        </v-chip>
      </template>
      <v-list link>
        <v-list-item to="/user">
          <v-list-item-title>账户信息</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-title>退出</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-chip v-else outlined class="font-weight-bold" @click="showSignInUp">
      登录 / 注册
    </v-chip>
    <SignInUpModal/>
  </v-app-bar>
</template>

<script>

export default {
  name: 'AppHeaderBar',

  components: {
    SignInUpModal: () => import('@/components/SignInUpModal'),
    UserProfileModal: () => import('@/components/UserProfileModal'),
  },
  data(){
    return {
    }
  },
  mounted() {
  },
  computed: {
    userName(){
      return this.$root.$data.userName();
    },
    isLogin(){
      return this.userName && this.userName.length > 0;
    }
  },
  methods: {
    logout(){
      this.$root.$data.logout();
    },
    showSignInUp(){
      this.$root.$data.showSignInUp();
    },
  }
}

</script>
