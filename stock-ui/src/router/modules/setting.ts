import Layout from "@/layout/index.vue";

export const UserName = {
  Setting: "Setting",
  ParamsSetting: "ParamsSetting",
  AlarmSetting: "AlarmSetting"
};

export const SettingRoutes = [
  {
    name: UserName.Setting,
    path: "/setting",
    component: Layout,
    redirect: "/setting/params-setting",
    meta: {
      title: "告警设置",
      icon: "icon-gaojing iconfont"
    },
    children: [
      {
        path: "params-setting",
        name: UserName.ParamsSetting,
        component: () => import("@/views/setting/params-setting.vue"),
        meta: {
          title: "参数设置"
        }
      },
      {
        path: "alarm-setting",
        name: UserName.AlarmSetting,
        component: () => import("@/views/setting/alarm-setting.vue"),
        meta: {
          title: "告警设置"
        }
      }
    ]
  }
];
