import Layout from "@/layout/index.vue";

export const ProjectName = {
  project: "project",
  projectAdd: "projectAdd",
  projectEdit: "projectEdit",
  projectList: "projectList",
  projectDetail: "projectDetail"
};

export const ProjectRoutes = [
  {
    name: ProjectName.project,
    path: "/project",
    component: Layout,
    redirect: "/project/index",
    meta: {
      title: "应用管理",
      icon: "icon-jiankong iconfont"
    },
    children: [
      {
        path: "index",
        name: ProjectName.projectList,
        component: () => import("@/views/project/index.vue"),
        meta: {
          title: "应用列表"
        }
      }
    ]
  }
];
