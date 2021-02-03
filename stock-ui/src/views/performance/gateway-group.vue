<template>
  <div>
    <div class="table-form mb-10 ui-flex ui-t-right">
      <div class="fs-16 ui-font-bold mb-10">接口性能走势</div>
      <DatetimePicker ref="datetimeRef" @change="onDateChange" />
    </div>
    <ErrorChart class="mb-10" :dataList="chartData" :dateRange="dateRange" />
    <div class="fs-16 ui-font-bold mb-20">接口性能排行</div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      size="small"
      border
      tooltip-effect="light"
      row-class-name="pointer"
    >
      <el-table-column prop="url" label="接口URL" min-width="200">
        <template slot-scope="{ row }">
          <span class="ui-pointer" @click="goDetail(row)">{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="avg_spend_time"
        label="平时响应时间"
        min-width="120"
      />
      <el-table-column prop="count" label="累计请求次数" min-width="100" />
      <el-table-column label="最近请求时间" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.last_time | dateTime }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { gatewayAPI } from "@/apis/gateway";
import ErrorChart from "./common/error-chart.vue";
import DatetimePicker from "@/bizUI/datetime-picker.vue";

export default {
  components: {
    ErrorChart,
    DatetimePicker
  },
  data() {
    return {
      tableForm: {},
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      chartData: [],
      tableLoading: false,
      dateRange: [new Date(Date.now() - 3600 * 1000 * 24 * 50), new Date()]
    };
  },

  created() {
    this.getTableData();
    this.getChartData();
  },

  methods: {
    onDateChange(dateRange) {
      this.dateRange = dateRange;
      this.getTableData();
      this.getChartData();
    },

    getTableData() {
      this.tableLoading = true;
      return gatewayAPI
        .getPerformanceByGroup({
          start_time: this.dateRange[0].getTime(),
          end_time: this.dateRange[1].getTime()
        })
        .then(res => {
          this.tableData = res.data || [];
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    getChartData() {
      const condition = [];
      const dateTime = this.dateRange;
      if (dateTime[0]) condition.push(`time >= ${dateTime[0].getTime()}`);
      if (dateTime[1]) condition.push(`time < ${dateTime[1].getTime()}`);
      gatewayAPI
        .getHistory({
          condition: JSON.stringify(condition)
        })
        .then(res => {
          this.chartData = res.data.list;
        });
    },

    goDetail({ url }) {
      this.$router.push({
        name: "gateway-performance-detail",
        params: {
          url: url
        }
      });
    }
  }
};
</script>
