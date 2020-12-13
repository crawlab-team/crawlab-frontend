<template>
  <div class="login-container">
    <canvas id="canvas"/>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      auto-complete="on"
      class="login-form"
      label-position="left"
      ref="loginForm"
    >
      <h3 class="title">
        <span><img src="../../assets/logo.svg" style="width:48px;margin-bottom:-5px;margin-right:2px"></span>RAWLAB
      </h3>
      <el-form-item prop="username" style="margin-bottom: 28px;">
        <el-input
          :placeholder="$t('Username')"
          auto-complete="on"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>
      <el-form-item prop="password" style="margin-bottom: 28px;">
        <el-input
          :placeholder="$t('Password')"
          auto-complete="on"
          name="password"
          v-model="loginForm.password"
        />
      </el-form-item>
      <el-form-item prop="confirmPassword" style="margin-bottom: 28px;" v-if="isSignUp">
        <el-input
          :placeholder="$t('Confirm Password')"
          auto-complete="on"
          name="password"
          v-model="loginForm.confirmPassword"
        />
      </el-form-item>
      <el-form-item prop="email" style="margin-bottom: 28px;" v-if="isSignUp">
        <el-input
          :placeholder="$t('Email')"
          name="email"
          v-model="loginForm.email"
        />
      </el-form-item>
      <el-form-item style="border: none">
        <el-button
          :loading="loading"
          style="width:100%;"
          type="primary"
          v-if="isSignUp"
        >
          {{ $t('Sign up') }}
        </el-button>
        <el-button
          :loading="loading"
          style="width:100%;"
          type="primary"
          v-if="!isSignUp"
        >
          {{ $t('Sign in') }}
        </el-button>
      </el-form-item>
      <div class="alternatives">
        <div class="left">
          <span class="forgot-password" v-if="!isSignUp">{{ $t('Forgot Password') }}</span>
        </div>
        <div class="right" v-if="allowRegister">
          <span v-if="isSignUp">{{ $t('Has Account') }}, </span>
          <span @click="$router.push('/login')" class="sign-in" v-if="isSignUp">{{ $t('Sign-in') }} ></span>
          <span v-if="!isSignUp">{{ $t('New to Crawlab') }}, </span>
          <span @click="$router.push('/signup')" class="sign-up" v-if="!isSignUp">{{ $t('Sign-up') }} ></span>
        </div>
      </div>
      <div class="tips">
        <span>{{ $t('Initial Username/Password') }}: admin/admin</span>
        <a href="https://github.com/crawlab-team/crawlab" style="float:right" target="_blank">
          <img src="https://img.shields.io/github/stars/crawlab-team/crawlab?logo=github">
        </a>
      </div>
      <div class="lang">
        <span :class="lang==='zh'?'active':''" @click="setLang('zh')">中文</span>
        |
        <span :class="lang==='en'?'active':''" @click="setLang('en')">English</span>
      </div>
      <div class="documentation">
        <a href="http://docs.crawlab.cn" target="_blank">{{ $t('Documentation') }}</a>
      </div>
      <div class="mobile-warning" v-if="isShowMobileWarning">
        <el-alert :closable="false" type="error">
          {{ $t('You are running on a mobile device, which is not optimized yet. Please try with a laptop or desktop.')
          }}
        </el-alert>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive} from 'vue';
import {isValidUsername} from '@/utils/validate';
import {useI18n} from 'vue-i18n';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    const {tm} = useI18n();

    const route = useRoute();

    const isSignUp = computed(() => route.path === '/signup');

    const loginForm = reactive<LoginForm>({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    });

    const validateUsername = (rule: any, value: any, callback: any) => {
      if (!isValidUsername(value)) {
        callback(new Error(tm('Please enter the correct username')));
      } else {
        callback();
      }
    };

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value.length < 5) {
        callback(new Error(tm('Password length should be no shorter than 5')));
      } else {
        callback();
      }
    };

    const validateConfirmPass = (rule: any, value: any, callback: any) => {
      if (!isSignUp.value) return callback();
      if (value !== loginForm.password) {
        callback(new Error(tm('Two passwords must be the same')));
      } else {
        callback();
      }
    };

    const loginRules: LoginRules = {
      username: [{required: true, trigger: 'blur', validator: validateUsername}],
      password: [{required: true, trigger: 'blur', validator: validatePass}],
      confirmPassword: [{required: true, trigger: 'blur', validator: validateConfirmPass}]
    };

    const localState = reactive<LoginViewState>({
      isShowMobileWarning: false,
      allowRegister: true,
      loginForm,
      loginRules,
    });

    const localComputed: LoginViewComputed = {
      isSignUp,
    };

    onMounted(() => {
      if (window.innerWidth >= 1024) {
        import('../../assets/js/loginCanvas.js');
      } else {
        localState.isShowMobileWarning = true;
      }
    });

    return {
      ...localState,
      ...localComputed,
    };
  }
});
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  $bg: white;
  $dark_gray: #889aa4;
  $light_gray: #aaa;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;

    .login-form {
      background: transparent;
      position: absolute;
      left: 0;
      right: 0;
      width: 480px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .tips {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
      background: transparent;

      span {
        &:first-of-type {
          margin-right: 22px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title {
      font-family: "Verdana", serif;
      /*font-style: italic;*/
      font-weight: 600;
      font-size: 48px;
      color: #409EFF;
      margin: 0px auto 20px auto;
      text-align: center;
      cursor: default;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .alternatives {
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #666;
      font-weight: 400;
      margin-bottom: 10px;
      padding-bottom: 10px;

      .forgot-password {
        cursor: pointer;
      }

      .sign-in,
      .sign-up {
        cursor: pointer;
        color: #409EFF;
        font-weight: 600;
      }
    }

    .lang {
      margin-top: 20px;
      text-align: center;
      color: #666;

      span {
        cursor: pointer;
        margin: 10px;
        font-size: 14px;
      }

      span.active {
        font-weight: 600;
        text-decoration: underline;
      }

      span:hover {
        text-decoration: underline;
      }
    }

    .documentation {
      margin-top: 20px;
      text-align: center;
      font-size: 14px;
      color: #409eff;
      font-weight: bolder;

      &:hover {
        text-decoration: underline;
      }
    }

    .mobile-warning {
      margin-top: 20px;
    }

  }
</style>
<style scoped>
  .mobile-warning >>> .el-alert .el-alert__description {
    font-size: 1.2rem;
  }

  #canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
</style>
