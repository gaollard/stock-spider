import "./report";
import { request } from "@/utils/request";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";

import "@webang/common-css/src/reset.css";
import "@webang/common-css/src/ui.less";
import "./assets/style/common.scss";
import "./assets/style/element-variables.scss";

import "./plugins/filter";
import ElementUI from "element-ui";

Vue.prototype.$http = request;

Vue.use(ElementUI);
moment.locale("ZH_CN");
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
