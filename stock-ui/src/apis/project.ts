import { request, host } from "@/utils/request";

export const projectAPI = {
  projectList(query: object) {
    return request({
      method: "GET",
      url: `${host}/project/page`,
      query
    });
  },
  projectAdd(params: object) {
    return request({
      method: "POST",
      url: `${host}/project/create`,
      data: params
    });
  },
  projectDel(params: object) {
    return request({
      method: "POST",
      url: `${host}/project/delete`,
      data: params
    });
  }
};
