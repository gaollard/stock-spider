<template>
  <div class="info">
    <div class="info-left">
      <div class="infoPadding">
        <div class="mb-10">概要信息</div>
        <div class="item" v-for="item in summaryList" :key="item.prop">
          <span class="item-label">{{ item.title }}</span>
          <span
            v-if="item.prop === 'url'"
            class="item-value u-clickable"
            @click="goTo(detail['url'])"
            >{{ detail[item.prop] || detail.value || "--" }}</span
          >
          <span v-else-if="item.prop === 'time'" class="item-value">{{
            +detail[item.prop] | formatTime
          }}</span>
          <span v-else class="item-value">{{ detail[item.prop] || "--" }}</span>
        </div>
      </div>

      <div class="infoPadding" v-if="isStack">
        <div class="mb-10">堆栈信息</div>
        <div class="stack-top">
          <span class="stack-label">{{ detail["type"] }}</span>
          <span class="ml-10">{{ detail["value"] }}</span>
        </div>
        <div class="stack-content">
          <div
            class="stack-item"
            v-for="(item, index) in stackFrames"
            :key="index"
          >
            <span
              >At {{ item.function || "?" }} {{ item.filename }}:{{
                item.lineno
              }}:{{ item.colno }}</span
            >
          </div>
        </div>
      </div>
      <div class="infoPadding">
        <div class="mb-10">错误信息</div>
        <div
          class="item"
          v-for="item in isStack ? errorSpecList : errorList"
          :key="item.prop"
        >
          <span class="item-label">{{ item.title }}</span>
          <span class="item-value">{{ detail[item.prop] || "--" }}</span>
        </div>
      </div>
    </div>

    <div class="info-right">
      <div class="infoPadding pr-4">
        <div class="mb-10">设备信息</div>
        <div class="item">
          <span class="item-label">浏览器</span>
          <span class="item-value">{{ device.brower }}</span>
        </div>
        <div class="item">
          <span class="item-label">JS引擎</span>
          <span class="item-value">{{ device.jsEngine }}</span>
        </div>
        <div class="item">
          <span class="item-label">操作系统</span>
          <span class="item-value">{{ device.os }}</span>
        </div>
      </div>
      <div class="infoPadding pr-4">
        <div class="mb-10">其他信息</div>
        <div class="item">
          <span class="item-label">插件版本</span>
          <span class="item-value">--</span>
        </div>
        <div class="item">
          <span class="item-label">事件ID</span>
          <span class="item-value">--</span>
        </div>
        <div class="item">
          <span class="item-label">userAgent</span>
          <span class="item-value">{{ metadata.request["User-Agent"] }}</span>
        </div>
      </div>
      <!-- <div class="infoPadding" v-for="v in rightIofo" :key="v.id">
        <div class="mb-10">{{ v.title }}</div>
        <div class="item" v-for="item in v.data" :key="item.prop">
          <span class="item-label">{{ item.title }}</span>
          <template v-if="v.id === 'equipment'">
            <span class="item-label">{{ detail[item.prop] || '--' }}</span>
            <span class="item-value">{{ detail[item.verson] || '--' }}</span>
          </template>
          <template v-else>
            <span class="item-value">{{ detail[item.prop] || '--' }}</span>
          </template>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getDevice } from "@/utils/index";
export default {
  name: "info",
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    isStack() {
      return (
        this.detail["type"] !== "resource" &&
        this.detail["type"] !== "unhandledrejection"
      );
    },
    stackFrames() {
      if (!this.isStack) return [];
      try {
        return this.metadata.exception.stacktrace.frames;
      } catch (e) {
        return [];
      }
    },
    device() {
      return getDevice(this.metadata.request["User-Agent"]);
    },
    metadata() {
      return JSON.parse(this.detail.metadata);
    },
    summaryList() {
      return [
        {
          title: "时间",
          prop: "time",
          value: moment(+this.detail.time).format("YYYY-MM-DD")
        },
        { title: "类型", prop: "type" },
        { title: "标题", prop: "project_name" },
        { title: "地址", prop: "page_url" }
      ];
    },
    rightIofo() {
      return [
        {
          title: "设备信息",
          id: "equipment",
          data: [
            { title: "浏览器", prop: "brower", verson: "browerverson" },
            { title: "JS引擎", prop: "js", verson: "jsverson" },
            { title: "操作系统", prop: "sys", verson: "sysverson" },
            { title: "用户设备", prop: "equ", verson: "equverson" }
          ]
        },
        {
          title: "位置信息",
          id: "position",
          data: [
            { title: "IP", prop: "ip" },
            { title: "地点", prop: "place" },
            { title: "运营商", prop: "bize" }
          ]
        },
        {
          title: "其他信息",
          id: "other",
          data: [
            { title: "插件版本", prop: "scriptverison" },
            { title: "事件ID", prop: "eventid" },
            { title: "userAgent", prop: "agent" }
          ]
        }
      ];
    }
  },

  data() {
    return {
      errorList: [
        { title: "名称", prop: "type" },
        { title: "信息", prop: "message" }
      ],
      errorSpecList: [
        { title: "名称", prop: "type" },
        { title: "信息", prop: "message" },
        { title: "文件", prop: "file" },
        { title: "行号", prop: "row" },
        { title: "列号", prop: "col" }
      ],
      requestList: [
        { title: "method", prop: "method" },
        { title: "url", prop: "httpurl" },
        { title: "params", prop: "params" }
      ],
      responseList: [
        { title: "status", prop: "status" },
        { title: "statusText", prop: "statusText" },
        { title: "response", prop: "response" },
        { title: "elapsedTime", prop: "elapsedTime" }
      ]
    };
  },

  methods: {
    goTo(v) {
      window.open(v);
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  flex-shrink: 0;
  height: calc(100% - 40px);
}
.infoPadding {
  padding: 16px;
  padding-bottom: 0;
}
.info-right {
  width: 32%;
  border-left: 1px solid #eee;
  overflow: auto;
}
.info-left {
  flex: 1;
  overflow: auto;
}
.item {
  display: flex;
  font-size: 12px;
  border-bottom: 1px solid #f2f3f3;
}
.item-label {
  width: 80px;
  padding: 10px 0;
  color: #9d9da1;
  &.sp-label {
    font-weight: 600;
    color: #9d9da1;
  }
}
.item-value {
  flex: 1;
  padding: 10px 0;
  word-break: break-all;
}
.item-pre {
  padding: 10px 0;
  width: calc(100% - 100px);
}
.stack-top {
  color: #6c6c72;
  padding: 3px 0;
}
.stack-label {
  font-weight: 500;
}

.stack-content {
  padding: 10px;
  border: 1px solid #f2f3f3;
  .stack-item {
    font-size: 12px;
    line-height: 1.5;
    text-indent: 10px;
    word-break: break-all;
    &:last-child {
      border: none;
    }
  }
}
</style>
