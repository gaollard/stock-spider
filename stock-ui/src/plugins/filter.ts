import Vue from "vue";
import moment from "moment";
import { filter } from "vue/types/umd";
import { format } from "echarts";

Vue.filter("dateTime", val => {
  if (!val) return "-";
  const date = val.substr(0, 10);
  const time = val.substr(11, 8);
  return `${date} ${time}`;
});

Vue.filter("sex", val => {
  return val === 1 ? "男" : "女";
});

Vue.filter("formatTimestamp", timestamp => {
  const date = new Date(timestamp);

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  const H = date.getHours();
  const M = date.getMinutes();
  const S = date.getSeconds();

  const z = (v: number) => (v > 9 ? v : `0${v}`);

  return `${y}-${z(m)}-${z(d)} ${z(H)}:${z(M)}:${z(S)}`;
});

Vue.filter("formatTime", (v, format = "YYYY-MM-DD HH:mm:ss") => {
  return (v && moment(v).format(format)) || "--";
});

Vue.filter("formatFromNow", v => {
  return (v && moment(v).fromNow()) || "--";
});

Vue.filter("dateTime", v => {
  return moment(+v).format("YYYY-MM-DD HH:mm:ss");
});
