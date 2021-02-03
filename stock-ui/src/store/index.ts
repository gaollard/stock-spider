import Vue from "vue";
import Vuex from "vuex";
import store from "store";
import { projectAPI } from "@/apis/project";

Vue.use(Vuex);

import user from "./modules/user";

export default new Vuex.Store({
  state: {
    isCollapse: false,
    project: "",
    projectList: []
  },
  mutations: {
    setProject(state, data) {
      state.project = data;
      store.set("appkey", data);
    },
    setProjectList(state, data) {
      state.projectList = data;
    }
  },
  actions: {
    getProject({ commit }) {
      projectAPI.projectList({}).then((res: any) => {
        const list = res.data.list || [];
        commit("setProject", list[3].app_secret);
        commit("setProjectList", res.data.list || []);
      });
    }
  },
  modules: {
    user
  }
});
