<template>
  <v-dialog v-model="showModal" :persistent="dialogPersistent" max-width="460px" transition="dialog-top-transition">
    <v-tabs v-model="tabs" fixed-tabs>
      <v-tab href="#sign-in-up-tabs-1" class="primary--text" >
        <span class="headline">登 录</span>
      </v-tab>
      <v-tab href="#sign-in-up-tabs-2" class="primary--text">
        <span class="headline">注 册</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item value="sign-in-up-tabs-1">
        <v-card>
          <v-card-text>
            <v-form v-model="signInValid" ref="signInForm" lazy-validation>
              <v-text-field
                label="账 号*"
                hint="通常是你的手机号"
                v-model="login"
                :rules="[rules().required, rules().max50Characters]"
                name="login"
                clearable
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules().required, rules().max50Characters]"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                label="密 码*"
                hint="At least 8 characters"
                clearable
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <small>* 项为必须录入项</small>
              <v-card-actions>
                <v-btn block color="success" dark @click="signIn()">
                  <span class="text-h5">登 录</span>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="sign-in-up-tabs-2">
        <v-card>
          <v-card-text>
            <v-form v-model="signUpValid" ref="signUpForm" lazy-validation>
              <v-text-field
                label="账 号 名*"
                hint="给你账号取个名字吧"
                v-model="name"
                :rules="[rules().required, rules().max50Characters]"
                clearable
              ></v-text-field>
              <v-text-field
                label="账 号*"
                hint="通常是你的电子邮箱地址"
                ref="loginField"
                :error-messages="loginError"
                v-model="login"
                :rules="[rules().required, rules().max50Characters]"
                clearable
                @blur="accountCheck"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules().required, rules().max50Characters]"
                :type="showPassword ? 'text' : 'password'"
                label="密 码*"
                hint="建议8位以上"
                clearable
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                v-model="passwordConfirm"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules().required, rules().passwordConfirm(this.passwordConfirm, this.password), rules().max50Characters]"
                :type="showPassword ? 'text' : 'password'"
                label="密 码 确 认*"
                hint="须与密码保持一致"
                clearable
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <small>* 项为必须录入项</small>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="success" dark @click="signUp()">
                  <span class="text-h5">注 册</span>
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-dialog>
</template>

<script>
import validateRules from  '@/utils/validate_rules'
export default {
  data(){
    return {
      tabs: null,
      signInValid: true,
      signUpValid: true,
      showPassword: false,
      name: '',
      login: '',
      password: '',
      passwordConfirm: '',
      loginError: '',
    }
  },
  props: {
    dialogPersistent: { type: Boolean, required: false, default: false },
  },
  computed: {
    showModal:{
      get(){
        return this.$root.$data.isShowSignInUp;
      },
      set(v){
        this.$root.$data.isShowSignInUp = v;
      }
    }
  },
  methods: {
    rules(){
      return validateRules;
    },
    signIn() {
      if(!this.$refs.signInForm.validate()) return false;
      const _this = this
      this.$root.$data.loginByAcount(
        { login: _this.login, password: _this.password },
        (success) => {
          if(success) _this.showModal = false;
        }
      );
    },
    accountCheck() {
      if(!this.$refs.loginField.validate()) return false;
      this.$root.$data.accountCheck(this.login);
    },
    signUp() {
      if(!this.$refs.signUpForm.validate()) return false;
      const _this = this
      this.$root.$data.register(
        { name: _this.name, login: _this.login, password: _this.password, passwordConfirm: _this.passwordConfirm },
        (success) => {
          if(success) _this.showModal = false;
        }
      );
    }
  }
}
</script>