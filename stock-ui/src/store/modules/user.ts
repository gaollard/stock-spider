import * as AccountAPI from "@/apis/account";
import { setToken } from "@/utils/auth";

const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

const initState = {
  roles: [],
  token: "",
  userInfo: null,
  currentRole: []
};

const state = deepClone(initState);

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  setRoles(state, roles) {
    state.roles = roles;
  },
  setCurrentRole(state, role) {
    state.currentRole = role;
  },
  clearLogin(state) {
    Object.assign(state, deepClone(initState));
    setToken("");
  }
};

const actions = {
  login({ commit }, payload) {
    return AccountAPI.userLogin(payload).then(({ data }: any) => {
      commit("setToken", data.token);
      commit("setUserInfo", data.userInfo);
      commit("setRoles", data.roles);
    });
  },
  getUserInfo({ commit }, token) {
    return AccountAPI.getUserInfo().then(({ data }: any) => {
      commit("setUserInfo", data.userInfo);
      commit("setRoles", data.roles);
      commit("setCurrentRole", [data.roles[0]]);
    });
  }
  // loginOut({ commit }) {
  //   return AccountAPI.loginOut().then(() => {
  //     commit("clearLogin");
  //   });
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
