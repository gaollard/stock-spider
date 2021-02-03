import { request, host } from "@/utils/request";

export const pageViewAPI = {
  pageviewList(params) {
    return request({
      method: "GET",
      url: `${host}/page-view/getGroup`,
      query: params
    });
  },
  pageviewHistoryByUrl(params) {
    return request({
      method: "GET",
      url: `${host}/page-view/getHistoryByUrl`,
      query: params
    });
  }
};
