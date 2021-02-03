import axios from "axios";
import Url from "url-parse";
import * as store from "store";
import { Message } from "element-ui";

export const isProd = process.env.NODE_ENV === "production";
// export const host = "http://localhost:8003";
export const host = "http://47.112.180.188:3040";

export const instance = axios.create({
  timeout: 10 * 1000
});

instance.interceptors.request.use(
  function(config) {
    config.headers["token"] = store.get("token") || "";
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    const res = response.data;
    if (+res.code === 0) {
      res.success = true;
    } else {
      res.success = false;
      Message({
        type: "error",
        message: res.errMsg
      });
    }
    return res;
  },
  error => {
    Message({
      type: "error",
      message: error
    });
    Promise.reject(error);
  }
);

const isPureObject = param => {
  return param && Object.prototype.toString.call(param) === "[object Object]";
};

const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";
const FULLFILLED = "FULLFILLED";

export const request = function(option) {
  option.url = host + option.url;

  if (isPureObject(option.query)) {
    const url = new Url(option.url, true);
    const appkey = store.get("appkey") || "";
    if (appkey) {
      url.query.appkey = appkey;
    }
    Object.assign(url.query, option.query);
    option.url = url.toString();
  }

  return new Promise((resolve, reject) => {
    let min = PENDING;
    let state = PENDING;
    let res: any = null;

    const next = function(name) {
      const cb = function() {
        if (state === RESOLVED) {
          resolve(res);
        } else {
          reject(res);
        }
      };
      if (name === "res" && min === FULLFILLED) {
        cb();
      }

      if (name === "min" && (state === RESOLVED || state === REJECTED)) {
        cb();
      }

      if (name === "max" && state === PENDING) {
        reject("timeout");
      }
    };

    setTimeout(() => {
      min = FULLFILLED;
      next("min");
    }, 500);

    setTimeout(() => {
      next("max");
    }, 10000);

    instance(option)
      .then(data => {
        res = data;
        state = RESOLVED;
        next("res");
      })
      .catch(error => {
        res = error;
        state = REJECTED;
        next("res");
      });
  });
};
