<template>
  <div class="echart-container" ref="chart"></div>
</template>

<script>
// import G2 from "@antv/g2";
import * as echarts from "echarts";
import { errorAPI } from "@/apis/error";
import { gatewayAPI } from "@/apis/gateway";
import moment from "moment";
export default {
  props: {
    dateRange: {
      type: Array,
      default: () => []
    },
    message: {
      type: String,
      default: ""
    },
    isCodeError: {
      type: Boolean,
      default: true
    }
  },

  mounted() {
    this.initEchart();
    window.addEventListener("resize", this.resizeEchart);
    this.$watch("dateRange", this.setChartData);
  },

  beforeDestory() {
    this.myEchart && window.removeEventListener("resize", this.resizeEchart);
  },

  methods: {
    initEchart() {
      this.myEchart = echarts.init(this.$refs.chart);
      this.setChartData();
    },

    async getChartData() {
      const dateRange = this.dateRange;
      const delta = dateRange[1].getTime() - dateRange[0].getTime();

      const ticktNum = 10;
      const format = "YYYY-MM-DD HH:mm:ss";

      const dataList = await this.getDataList();
      const hList = [];
      const vagTime = delta / ticktNum;
      const start_time = dateRange[0].getTime();

      for (let index = 0; index < ticktNum; index++) {
        hList.push({
          start: start_time + index * vagTime,
          end: start_time + (index + 1) * vagTime,
          value: 0,
          label: moment(start_time + (index + 1) * vagTime).format(format)
        });
      }
      hList.forEach(el => {
        dataList.forEach(d => {
          if (+d.time >= el.start && +d.time < el.end) {
            el.value += 1;
          }
        });
      });
      return hList;
    },

    async getDataList() {
      if (!this.isCodeError) {
        const condition = ["http_code > 200"];
        const dateTime = this.dateRange;
        if (dateTime[0]) condition.push(`time >= ${dateTime[0].getTime()}`);
        if (dateTime[1]) condition.push(`time < ${dateTime[1].getTime()}`);
        if (this.message) condition.push(`url = "${this.message}"`);
        return gatewayAPI
          .getHistory({
            condition: JSON.stringify(condition)
          })
          .then(res => {
            return res.data.list;
          });
      } else {
        const params = {
          pageSize: 0,
          fileds: "time"
        };
        const dateTime = this.dateRange;
        if (dateTime[1]) params.end_time = dateTime[1].getTime();
        if (dateTime[0]) params.start_time = dateTime[0].getTime();
        if (this.message) params.searchKey = this.message;
        return errorAPI.errorList(params).then(res => {
          return res.data.list;
        });
      }
    },

    async setChartData() {
      const list = await this.getChartData();
      console.log(list);
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            const format = "YYYY-MM-DD HH:mm:ss";
            const index = params[0].dataIndex;
            return `<div style="font-size: 12px">
              ${moment(list[index].start).format(format)} ~ ${moment(
              list[index].end
            ).format(format)}</br>
              异常总数: ${list[index].value} 次</br>
            </div>`;
          }
        },
        grid: {
          left: "3%",
          right: "1%",
          top: "6%",
          bottom: "14%"
        },
        xAxis: {
          type: "category",
          data: list.map(el => el.label),
          axisLabel: {
            interval: 0,
            rotate: 0,
            fontSize: 8
          }
        },
        yAxis: {
          show: true
        },
        series: [
          {
            data: list.map(el => el.value),
            type: "bar",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            barWidth: 25
          },
          {
            data: list.map(el => el.value),
            type: "line",
            lineStyle: {
              color: "#2378f7",
              width: 2
            }
          }
        ]
      };
      this.myEchart.setOption(option);
    }
  }
};
</script>

<style lang="less" scoped>
.echart-container {
  width: 100%;
  height: 250px;
  padding-top: 10px;
}
</style>
