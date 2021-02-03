<template>
  <div class="echart-container" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
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
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },

  mounted() {
    this.initEchart();
    window.addEventListener("resize", this.resizeEchart);
    this.$watch("dataList", this.setChartData);
  },

  beforeDestory() {
    this.myEchart && window.removeEventListener("resize", this.resizeEchart);
  },

  methods: {
    initEchart() {
      this.myEchart = echarts.init(this.$refs.chart);
      this.setChartData();
    },

    getChartData() {
      const dateRange = this.dateRange;
      const delta = dateRange[1].getTime() - dateRange[0].getTime();

      const ticktNum = 10;
      const format = "YYYY-MM-DD HH:mm:ss";

      const dataList = this.dataList;
      const hList = [];
      const vagTime = delta / ticktNum;
      const start_time = dateRange[0].getTime();

      for (let index = 0; index < ticktNum; index++) {
        hList.push({
          start: start_time + index * vagTime,
          end: start_time + (index + 1) * vagTime,
          value: 0,
          total: 0,
          label: moment(start_time + (index + 1) * vagTime).format(format)
        });
      }
      hList.forEach(el => {
        dataList.forEach(d => {
          if (+d.time >= el.start && +d.time < el.end) {
            el.value += 1;
            el.total += d.spend_time;
          }
        });
      });
      return hList;
    },

    setChartData() {
      const list = this.getChartData();
      const serie = list.map(el => el.total / (el.value || 1));
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params, ticket, callback) {
            ticket;
            callback;
            // const label = params[0].axisValue;
            const format = "YYYY-MM-DD HH:mm:ss";
            const index = params[0].dataIndex;
            const value = serie[index].toFixed(1);

            return `<div style="font-size: 12px">
              ${moment(list[index].start).format(format)} ~ ${moment(
              list[index].end
            ).format(format)}</br>
              累计调用次数: ${list[index].value} 次</br>
              平均响应时间: ${value} ms
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
            data: serie,
            type: "bar",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)"
            },
            barWidth: 25
          },
          {
            data: serie,
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
