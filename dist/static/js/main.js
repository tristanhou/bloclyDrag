import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue';
import importDirective from '@/directive';
Vue.use(Vant);
/**
 * 注册指令
 */

importDirective(Vue);
var app = new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    message: 'Hello Vue!'
  }
});