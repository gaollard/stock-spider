import Layout from "@/layout/index.vue";

export const errorRoutes = [
  {
    name: "error-layout",
    path: "/error",
    component: Layout,
    redirect: "/error/code",
    meta: {
      title: "异常监控",
      icon: "icon-error- iconfont"
    },
    children: [
      {
        path: "code",
        name: "code-error",
        component: () => import("@/views/error/code-error-group.vue"),
        meta: {
          title: "代码异常"
        },
        children: [
          {
            path: ":searchKey",
            name: "code-error-detail",
            component: () => import("@/views/error/code-error-item.vue"),
            meta: {
              title: "错误详情",
              hidden: true
            }
          }
        ]
      },
      {
        path: "gateway",
        name: "gateway-error",
        component: () => import("@/views/error/gateway-group.vue"),
        meta: {
          title: "接口异常"
        },
        children: [
          {
            path: ":url",
            name: "gateway-error-item",
            component: () => import("@/views/error/gateway-item.vue"),
            meta: {
              title: "异常历史记录",
              hidden: true
            }
          }
        ]
      }
    ]
  }
];
