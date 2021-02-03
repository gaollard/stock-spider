import { ProjectRoutes } from "./modules/project";
import { SettingRoutes } from "./modules/setting";
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index.vue";
import { errorRoutes } from "./modules/error";
import { performanceRoutes } from "./modules/performance";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    component: Layout,
    name: "Dashboard",
    redirect: "/dashboard",
    meta: {
      title: "基金排行",
      icon: "icon-home iconfont"
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          hidden: true
        },
        component: () => import("@/views/dashboard/index.vue")
      }
    ]
  }
];

const makeRoutes = () => {
  const rList: any = [];

  const rawChildren = (parent, children = [], top) => {
    children.forEach((item: any) => {
      item.path = (parent.path + "/" + item.path).replace("//", "/");
      const child = {
        ...item
      };
      delete child.children;
      top.children.push(child);
      rawChildren(item, item.children, top);
    });
  };

  routes.forEach((item: any) => {
    const child: any = {
      ...item,
      children: []
    };
    rawChildren(child, item.children || [], child);
    rList.push(child);
  });

  return rList;
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: makeRoutes()
});

export default router;
