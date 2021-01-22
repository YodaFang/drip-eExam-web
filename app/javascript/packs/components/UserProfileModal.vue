<template>
  <v-dialog
    v-model="showModal"
    max-width="680px"
    transition="dialog-top-transition"
    scrollable
  >
      <v-card>
        <v-card-title>您的账号信息</v-card-title>
        <v-divider></v-divider>
        <v-card-text >
          <v-form
          v-model="signUpValid"
          ref="signUpForm"
          lazy-validation
        >
          <v-row>
          <v-col cols="12" sm="6">
          <v-text-field
            label="账 号 名*"
            hint="给你账号取个名字吧"
            v-model="name"
            :rules="[rules().required, rules().max50Characters]"
            clearable
          ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
          <v-text-field
            label="账 号 名*"
            hint="给你账号取个名字吧"
            v-model="name"
            :rules="[rules().required, rules().max50Characters]"
            clearable
          ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
          <v-text-field
            label="账 号 名*"
            hint="给你账号取个名字吧"
            v-model="name"
            :rules="[rules().required, rules().max50Characters]"
            clearable
          ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
          <v-text-field
            label="账 号 名*"
            hint="给你账号取个名字吧"
            v-model="name"
            :rules="[rules().required, rules().max50Characters]"
            clearable
          ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          <v-col cols="12" sm="6">
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
          </v-col>
          </v-row>
          <small>* 项为必须录入项</small>
        </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="success"
            dark
            block
            @click="showModal = false"
          >
            更 新
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import validateRules from  '@/utils/validate_rules'

export default {
  data: () => ({
    signInValid: true,
    signUpValid: true,
    showModal: false,
    showPassword: false,
    name: '',
    login: '',
    password: '',
    passwordConfirm: '',
    loginError: '',
  }),
  methods: {
    rules(){
      return validateRules;
    },
    signIn() {
      if(!this.$refs.signInForm.validate()) return false;

      const _this = this
      this.$root.$data.user.loginByAcount(
        { login: this.login, password: this.password },
        (success) => {
          if(success) _this.showModal = false;
        }
      );
    },
    accountCheck() {
      if(!this.$refs.loginField.validate()) return false;

      this.$root.$data.user.accountCheck(this.login);
    },
    signUp() {
      if(!this.$refs.signUpForm.validate()) return false;

      const _this = this
      this.$root.$data.user.register(
        { name: this.name, login: this.login, password: this.password, passwordConfirm: this.passwordConfirm },
        (success) => {
          if(success) _this.showModal = false;
        }
      );
    }
  }
}
</script>