<template>
  <section class="container">
    <!-- 注册 -->
    <!-- <form v-if="!isLogin" ref="registerForm" class="login-form">
      <div class="hearder tc">
        注册
      </div>
      <md-field :class="{'md-invalid': errors.has('nickname')}">
        <label>昵称</label>
        <md-input v-validate="'required|min:2|max:22'" v-model="registerForm.nickname" name="nickname"/>
        <span v-show="errors.has('nickname')" class="md-error">昵称输入有误!</span>
      </md-field>

      <md-field :class="{'md-invalid': errors.has('account')}">
        <label>Email</label>
        <md-input v-validate="'required|email'" v-model="registerForm.account" name="account" />
        <span v-show="errors.has('account')" class="md-error">电子邮箱格式错误</span>
      </md-field>

      <md-field :class="{'md-invalid': errors.has('secret')}">
        <label>密码</label>
        <md-input v-validate="'required|min:6|max:22'" v-model="registerForm.secret" name="secret" />
        <span v-show="errors.has('account')" class="md-error">密码输入有误!</span>
      </md-field>

      <div class="has-count">
        已有账号？点击<a class="do-login" @click.prevent="doLogin">登录</a>
      </div>

      <div class="tc footer w80">
        <md-button class="md-raised md-primary w100 mg0" @click.prevent="sbRegister">注册</md-button>
      </div>
    </form> -->

    <!-- 登录 -->
    <form v-if="isLogin" ref="loginForm" class="login-form" >
      <div class="hearder tc">
        登录
      </div>
      <md-field :class="{'md-invalid': errors.has('account')}">
        <label>Email</label>
        <md-input v-validate="'required|email'" v-model="loginForm.account" name="account" />
        <span v-show="errors.has('account')" class="md-error">电子邮箱格式错误</span>
      </md-field>

      <md-field :class="{'md-invalid': errors.has('secret')}">
        <label>密码</label>
        <md-input v-validate="'required|min:6|max:22'" v-model="loginForm.secret" name="secret" />
        <span v-show="errors.has('account')" class="md-error">密码输入有误!</span>
      </md-field>

      <div class="has-count">
        没有账号？点击<a class="do-login" @click.prevent="doLogin">注册</a>
      </div>

      <div class="tc footer w80">
        <md-button class="md-raised md-primary w100 mg0" @click.prevent="sbLogin">登录</md-button>
      </div>
    </form>

    <div class="tc footer w80">
      <md-button class="md-raised md-primary w100 mg0" @click.prevent="doTest">测试</md-button>
    </div>

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
      isLogin: true,
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
      // hasMessages: false
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
    doTest(){
      getAllHabit().then(res => {
        console.log('getAllHabit',res);
      });
    },
    doLogin(){
      this.isLogin=!this.isLogin
    },
    sbLogin(){
      this.$validator.validate().then(result => {
        if (!result) {
          console.log('error', result)
          return
        }
        login(this.loginForm).then(res => {
          console.log('res', res)
          if (!res.error_code) {
            setLocal('token',window.btoa(res.data.token))
            showToast('登录成功');
            // setTimeout(() => {
            // }, timeout);
          } else {
            showToast('登录失败');
          }
        })
      })
    },
    sbRegister() {
      this.$validator.validate().then(result => {
        if (!result) {
          console.log('error', result)
          // console.log('222', this.errors);
          // this.errors.clear();
          return
        }
        register(this.registerForm).then(res => {
          console.log('res', res)
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
