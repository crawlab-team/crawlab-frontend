import {Computed} from 'vuex';

declare global {
  interface LoginForm {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
  }

  interface LoginRules {
    username: ElFormRule[];
    password: ElFormRule[];
    confirmPassword: ElFormRule[];
  }

  interface LoginViewState {
    isShowMobileWarning: boolean;
    allowRegister: boolean;
    loginForm: LoginForm;
    loginRules: Readonly<LoginRules>;
  }

  interface LoginViewComputed {
    isSignUp: Computed<boolean>;
  }
}
