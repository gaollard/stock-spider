import { request, host } from "@/utils/request";

export const errorList = () => {
  return request({
    method: "GET",
    url: `${host}/error`,
    query: {
      pageIndex: 1,
      pageSize: 15
    }
  });
};

export const userListGet = () => {
  return request({
    method: "GET",
    url: `${host}/nuser`,
    query: {
      pageIndex: 1,
      pageSize: 15
    }
  });
};

export const userLogin = ({ account, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          avatar: "https://c1.airtlab.com/17.png",
          background: null,
          college: null,
          createTime: "2020-05-29T15:09:47.000Z",
          email: "xmanba@163.com",
          gender: 0,
          id: 52,
          loginTime: null,
          mobile: "",
          nickname: "倚栏听风",
          password: "123456",
          rcoinNum: 0,
          residence: null,
          token: "42c112afed1a56dc1ffc69abbdd5f990",
          words: "前端扛把子"
        },
        errCode: "0",
        errMsg: "",
        retCode: "0"
      });
    }, 500);
  });
  // return request({
  //   method: "POST",
  //   url: `${host}/user/login`,
  //   data: {
  //     account,
  //     password
  //   }
  // });
};

export const getUserInfo = token => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          userInfo: {
            avatar: "https://c1.airtlab.com/17.png",
            background: null,
            college: null,
            createTime: "2020-05-29T15:09:47.000Z",
            email: "xmanba@163.com",
            gender: 0,
            id: 52,
            loginTime: null,
            mobile: "",
            nickname: "倚栏听风",
            password: "123456",
            rcoinNum: 0,
            residence: null,
            token: "42c112afed1a56dc1ffc69abbdd5f990",
            words: "前端扛把子"
          }
        },
        errCode: "0",
        errMsg: "",
        retCode: "0"
      });
    }, 500);
  });
  // return request({method: "GET", url: `${host}/user/userInfo`, query: {
  //     token
  //   }});
};

export const loginOut = () => {
  return Promise.resolve({});
};
