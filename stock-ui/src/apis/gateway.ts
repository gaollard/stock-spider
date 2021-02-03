import { request, host } from "@/utils/request";

export const gatewayAPI = {
  groupList(query: object) {
    return request({
      method: "GET",
      url: `${host}/gateway/group`,
      query
    });
  },
  getPerformanceByGroup(query) {
    return request({
      method: "GET",
      url: `${host}/gateway/group-performance`,
      query
    });
  },
  getHistory(query: object) {
    return request({
      method: "GET",
      url: `${host}/gateway/history`,
      query
    });
  },
  getPerformanceByUrl(query) {
    return request({
      method: "GET",
      url: `${host}/gateway/performance-by-url`,
      query
    });
  },
  // 异常接口分组
  errorGroup(query: object) {
    return request({
      method: "GET",
      url: `${host}/gateway/error/group`,
      query: query
    });
  },
  // 异常接口分组
  errorHistory(query: object) {
    return request({
      method: "GET",
      url: `${host}/gateway/error/history`,
      query: query
    });
  },
  // 获取指定 url 的异常记录
  getUrlErrorHistory(query: object) {
    return request({
      method: "GET",
      url: `${host}/gateway/error/getErrorHistoryByUrl`,
      query
    });
  },
  pageList(query: object) {
    return request({
      method: "GET",
      url: `${host}/gateway/page`,
      query: query
    });
  }
};
