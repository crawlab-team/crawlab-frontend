import {createApp} from 'vue';
import ElementPlus from 'element-plus';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import i18n from '@/i18n';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import 'element-plus/lib/theme-chalk/index.css';
import '@/styles/index.scss';

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
