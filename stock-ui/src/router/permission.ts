// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// import router from "./index";
// import store from "../store/index";
// import { getToken } from "../utils/auth";

// const whiteList = ["/login", "/about"]; // no redirect whitelist

// router.beforeEach(async (to, from, next) => {
//   NProgress.start();
//   const hasToken = getToken();
//   if (hasToken) {
//     if (to.path === "/login") {
//       next({ path: "/" });
//       NProgress.done();
//     } else {
//       await store.dispatch("user/getUserInfo");
//       next();
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next();
//     } else {
//       next(`/login?redirect=${to.path}`);
//       NProgress.done();
//     }
//   }
// });

// router.afterEach(() => {
//   NProgress.done();
// });
