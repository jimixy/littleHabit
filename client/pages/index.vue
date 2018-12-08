<template>
  <section class="container">
    <!-- 注册 -->
    <form v-show="!isLogin" class="login-form" data-vv-scope="registerForm">
      <div class="hearder tc">
        注册
      </div>
      <md-field :class="{'md-invalid': errors.has('registerForm.nickname')}">
        <label>昵称</label>
        <md-input v-validate="'required|min:2|max:22'" v-model.trim="registerForm.nickname" name="nickname"/>
        <span v-show="errors.has('registerForm.nickname')" class="md-error">昵称输入有误!</span>
      </md-field>

      <md-field :class="{'md-invalid': errors.has('registerForm.account')}">
        <label>Email</label>
        <md-input v-validate="'required|email'" v-model.trim="registerForm.account" name="account" />
        <span v-show="errors.has('registerForm.account')" class="md-error">电子邮箱格式错误</span>
      </md-field>

      <md-field :class="{'md-invalid': errors.has('registerForm.secret')}">
        <label>密码</label>
        <md-input v-validate="'required|min:6|max:22'" v-model.trim="registerForm.secret" name="secret" @keyup.enter="sbRegister"/>
        <span v-show="errors.has('registerForm.secret')" class="md-error">密码输入有误!</span>
      </md-field>

      <div class="has-count">
        已有账号？点击<a class="do-login" @click.prevent="doLogin">登录</a>
      </div>

      <div class="tc footer w80">
        <md-button class="md-raised md-primary w100 mg0" @click.prevent="sbRegister">注册</md-button>
      </div>
    </form>

    <!-- 登录 -->
    <form v-show="isLogin" class="login-form" data-vv-scope="loginForm">
      <div class="hearder tc">
        登录
      </div>
      <md-field :class="{'md-invalid': errors.has('loginForm.account')}">
        <label>Email</label>
        <md-input v-validate="'required|email'" v-model.trim="loginForm.account" name="account" />
        <span v-show="errors.has('loginForm.account')" class="md-error">电子邮箱格式错误</span>
      </md-field>

      <md-field :class="{'md-invalid': errors.has('loginForm.secret')}">
        <label>密码</label>
        <md-input v-validate="'required|min:6|max:22'" v-model.trim="loginForm.secret" type="password" name="secret" @keyup.enter="sbLogin" />
        <span v-show="errors.has('loginForm.secret')" class="md-error">密码输入有误!</span>
      </md-field>

      <div class="has-count">
        没有账号？点击<a class="do-login" @click.native="doLogin">注册</a>
      </div>

      <div class="tc footer w80">
        <md-button class="md-raised md-primary w100 mg0" @click.native="sbLogin">登录</md-button>
      </div>
    </form>
    
  </section>
</template>

<script>
import { login, register, getAllHabit } from '~/api/user'
import { showToast  } from '~/components/toast'
import { setLocal } from '~/libs/util'

export default {
  components: { },
  data() {
    return {
      isLogin: false,
      registerForm: {
        type: 100,
        nickname: '',
        account: '',
        secret: ''
      },
      loginForm: {
        type: 100,
        account: '',
        secret: ''
      },
    }
  },
  computed: {
    // messageClass() {
    //   return {
    //     'md-invalid': this.hasMessages
    //   }
    // }
  },
  methods: {
    doLogin(){
      this.$validator.reset();
      this.isLogin=!this.isLogin;
    },
    sbLogin(){
      this.$validator.validateAll('loginForm').then(result => {
        if (!result) {
          return
        }
        login(this.loginForm).then(res => {
          if (!res.error_code) {
            setLocal('token',window.btoa(res.data.token))
            showToast('登录成功');
            this.$router.push({
              path:'/home'
              // query: { plan: 'private' }
            });
          } else {
            showToast('登录失败');
          }
        })
      })
    },
    sbRegister() {
      this.$validator.validateAll('registerForm').then(result => {
        if (!result) {
          return
        }
        register(this.registerForm).then(res => {
          if (!res.error_code) {
            showToast('注册成功');
          } else {
            showToast('注册失败');
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;

  .login-form {
    position: absolute;
    font-size: $hehe;
    width: 80%;
    margin: auto;
    top: 35%;
    left: 0;
    bottom: 0;
    right: 0;
    .footer{
      position: absolute;
      bottom: 10vh;
      left: 0;
    }
    .has-count{
      font-size: 12px;
      text-align: right;
    }
  }

}
</style>
