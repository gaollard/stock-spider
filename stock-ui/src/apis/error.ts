import { request, host } from "@/utils/request";
import qs from "qs";

export const errorAPI = {
  // 分组列表
  errorGroupList(query) {
    return request({
      method: "GET",
      url: `${host}/error/group`,
      query
    });
  },
  // 错误列表
  errorList(query) {
    return request({
      method: "GET",
      url: `${host}/error/page`,
      query
    });
  },
  // 错误详情
  errorDetail(query) {
    return request({
      method: "GET",
      url: `${host}/error/detail`
    });
  },
  errorDetailSummay(query) {
    return request({
      method: "GET",
      url: `${host}/error/error-detail-summary`,
      query
    });
  }
};
