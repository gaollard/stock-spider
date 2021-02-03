import { request, host } from "@/utils/request";

interface PageInfo {
  pageSize?: string | number;
  pageIndex?: string | number;
}

export const adminAPI = {
  // 列表
  adminList(params: PageInfo) {
    return request({
      method: "GET",
      url: `${host}/admin/user/page`,
      query: params
    });
  },

  // 详情
  adminDetail(id: string) {
    return request({
      method: "GET",
      url: `${host}/admin/user/${id}`
    });
  },

  // 新增
  adminAdd(params: any) {
    return request({
      method: "POST",
      url: `${host}/admin/user`,
      data: params
    });
  },

  // 修改
  adminEdit({ id, ...params }) {
    return request({
      method: "PUT",
      url: `${host}/admin/user/${id}`,
      data: params
    });
  },

  // 删除
  adminDelete(id: string) {
    return request({
      method: "DELETE",
      url: `${host}/admin/user/${id}`
    });
  }
};
