import { request, host } from "@/utils/request";

// 登录
export const userLogin = params => {
  return request({
    method: "POST",
    url: `${host}/admin/user/login`,
    data: params
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: `${host}/admin/user/info`
  });
};

// 退出登录
export const loginOut = () => {
  return request({
    method: "POST",
    url: `${host}/admin/user/logout`
  });
};

export const getConfig = () => {
  return request({
    method: "GET",
    url: `${host}/system-config`
  });
};
