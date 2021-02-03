import Layout from "@/layout/index.vue";

export const performanceRoutes = [
  {
    name: "performance-layout",
    path: "/performance",
    component: Layout,
    redirect: "/performance/page",
    meta: {
      title: "性能监控",
      icon: "icon-xingneng iconfont"
    },
    children: [
      {
        path: "page",
        name: "page-performance",
        component: () => import("@/views/performance/page-group.vue"),
        meta: {
          title: "页面性能"
        },
        children: [
          {
            path: ":searchKey",
            name: "page-performance-detail",
            component: () => import("@/views/performance/page-item.vue"),
            meta: {
              title: "页面访问记录",
              hidden: true
            }
          }
        ]
      },
      {
        path: "gateway",
        name: "gateway-performance",
        component: () => import("@/views/performance/gateway-group.vue"),
        meta: {
          title: "接口性能"
        },
        children: [
          {
            path: ":url",
            name: "gateway-performance-detail",
            component: () => import("@/views/performance/gateway-item.vue"),
            meta: {
              title: "接口访问记录",
              hidden: true
            }
          }
        ]
      }
    ]
  }
];
