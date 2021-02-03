<template>
  <div class="detail">
    <div class="table-form mb-10 ui-t-right">
      <DatetimePicker ref="datetimeRef" @change="onDateChange" />
    </div>
    <div class="chart-wrap">
      <ErrorChart
        class="chart"
        :dateRange="dateRange"
        :message="$route.params.searchKey"
      />
      <div class="summary">
        <div class="col">
          <div class="num">{{ user_count }}</div>
          <div class="text">用户数</div>
        </div>
        <div class="col">
          <div class="num">{{ list.length }}</div>
          <div class="text">事件数</div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="detail-main" v-if="detail">
      <div class="left">
        <div class="event-header pl-8 fs-16">
          <i class="el-icon el-icon-refresh"></i>
          <span class="ml-8">事件列表</span>
        </div>
        <div class="event-list">
          <div
            class="item"
            v-for="item in list"
            :key="item.id"
            :class="{ current: currentId === item.id }"
            @click="handleClick(item)"
          >
            <div class="item-head">
              <span class="fs-16">{{ item.type }}</span>
              <span class="text-gray fs-12">{{
                +item.time | formatFromNow
              }}</span>
            </div>
            <div class="item-body mt-10">{{ item.value }}</div>
            <div class="item-bottom mt-8">
              <span class="item-bottom__l">
                <img
                  class="mr-8"
                  width="15"
                  height="15"
                  src="./img/ios.9af0022e.svg"
                  alt=""
                />
                <img
                  class="mt-2"
                  width="14"
                  height="14"
                  src="./img/chrome.f836b32e.svg"
                  alt=""
                />
              </span>
              <span class="text-gray fs-12">广东</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <el-tabs class="tabs" v-model="currentTab" type="card">
          <el-tab-pane
            v-for="v in tabList"
            :name="v.id"
            :label="v.label"
            :disabled="!v.notDisabled"
            :key="v.id"
          >
            <div class="pl-12 pr-12" slot="label">
              {{ v.label }}
            </div>
            <div class="tab-content">
              <template v-if="currentTab === '1'">
                <Info :detail="detail" />
              </template>
              <template v-if="currentTab === '5'">
                <pre
                  class="json"
                ><code class="json-code">{{JSON.parse(detail['metadata'] || "")}}</code></pre>
              </template>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { errorAPI } from "@/apis/error";
import Info from "./common/info.vue";
import ErrorChart from "./common/error-chart.vue";
import DatetimePicker from "./common/datetime-picker.vue";
export default {
  components: {
    Info,
    ErrorChart,
    DatetimePicker
  },
  data() {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      user_count: 0,
      detail: null,
      loading: false,
      list: [],
      currentId: "",
      currentTab: "1",
      metadata: {},
      dateRange: [new Date(Date.now() - 3600 * 1000 * 24 * 1), new Date()],
      tabList: [
        { id: "1", label: "基本信息", notDisabled: true },
        { id: "5", label: "metadata", notDisabled: true }
      ]
    };
  },

  computed: {
    isStack() {
      return (
        this.detail["type"] !== "resource" &&
        this.detail["type"] !== "unhandledrejection"
      );
    }
  },

  mounted() {
    this.initData();
    // errorAPI.errorDetailSummay({
    //   searchKey: this.$route.params.searchKey,
    //   start_time: this.dateRange[0].getTime(),
    //   end_time: this.dateRange[1].getTime(),
    // }).then(res => {
    //   console.log(res)
    // })
  },

  methods: {
    async onDateChange() {
      const dateRange = this.$refs.datetimeRef.value;
      this.dateRange = dateRange;
      this.initData();
    },
    initData() {
      this.loading = true;
      errorAPI
        .errorList({
          ...this.pageInfo,
          searchKey: this.$route.params.searchKey,
          start_time: this.dateRange[0].getTime(),
          end_time: this.dateRange[1].getTime()
        })
        .then(res => {
          this.user_count = res.data.user_count;
          this.list = res.data.list || [];
          this.currentId = this.list[0].id;
          this.detail = this.list[0];
          this.handleClick(this.detail);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleClick(v) {
      this.currentId = v.id;
      this.detail = v;
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  overflow: auto;
  box-sizing: border-box;
  height: calc(100vh - 40px - 34px - 16px);
  padding-left: 0;
  padding-bottom: 0;
  /deep/ .el-tabs__header {
    margin-bottom: 0;
  }
  .chart {
    flex: 1;
    height: 140px;
  }
  .divider {
    height: 2px;
    margin: 4px 0;
  }
  .chart-wrap {
    display: flex;
    align-items: center;
    .summary {
      width: 200px;
      display: flex;
    }
    .col {
      flex: 1;
      text-align: center;
    }
    .num {
      font-size: 24px;
      color: #00a680;
    }
    .text {
      font-size: 12px;
      color: #6c6c72;
    }
  }
}

.detail-main {
  height: calc(100% - 42px - 160px);
  display: flex;
  // flex: 1;
  .event-header {
    line-height: 40px;
    border-bottom: 1px solid #eee;
  }
  .left {
    display: flex;
    flex-direction: column;
    width: 260px;
    height: 100%;
    max-height: 100%;
    overflow: auto;
    box-sizing: border-box;
    .event-list {
      flex: 1;
      overflow: auto;
      border-right: 1px solid #eee;
    }
  }
  .right {
    overflow: auto;
    flex: 1;
    margin-left: -1px;
    .tabs {
      height: 100%;
    }
    /deep/ .el-tabs__content {
      height: calc(100% - 41px);
    }
    /deep/ .info-left,
    /deep/ .info-right,
    /deep/ .info,
    /deep/ .tab-content,
    /deep/ .el-tab-pane {
      height: 100%;
    }
  }
}

// 事件列表
.item {
  position: relative;
  padding: 6px 10px 6px 10px;
  height: 78px;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    background: #fbfcfc;
  }
  &.current {
    background: #f2f2f2;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 3px;
      height: 100%;
      background: #00a680;
    }
  }
  .item-body {
    width: 82%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    color: #6c6c72;
  }
  .item-head,
  .item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__l {
      display: flex;
      align-items: center;
    }
  }
}

// metadata
.json {
  display: block;
  max-height: calc(100% - 40px);
  padding: 10px;
  margin: 16px;
  margin-right: 0;
  line-height: 1.4;
  color: #fff;
  background: #111;
  border-radius: 5px;
  overflow: auto;
  box-sizing: border-box;
}
.json-code {
  color: #a6e22e;
}
</style>
