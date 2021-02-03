<template>
  <div>
    <div class="table-form mb-10 ui-flex ui-t-right">
      <div class="fs-16 ui-font-bold mb-10">接口性能走势</div>
      <DatetimePicker ref="datetimeRef" @change="onDateChange" />
    </div>
    <ErrorChart class="mb-10" :dataList="tableData" :dateRange="dateRange" />
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      size="small"
      border
      tooltip-effect="light"
      row-class-name="pointer"
    >
      <el-table-column prop="url" label="接口名称" min-width="200" />
      <el-table-column prop="page_url" label="访问页面" min-width="150" />
      <el-table-column prop="start_time" label="开始时间" min-width="120">
        <template slot-scope="{ row }">
          <span>{{ row.start_time | dateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" min-width="120">
        <template slot-scope="{ row }">
          <span>{{ row.end_time | dateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="spend_time" label="响应耗时" min-width="100" />
      <el-table-column prop="http_code" label="状态码" min-width="100" />
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
      tableLoading: false,
      chartData: [],
      dateRange: [new Date(Date.now() - 3600 * 1000 * 24 * 50), new Date()]
    };
  },

  created() {
    this.getTableData();
  },

  methods: {
    onDateChange(dateRange) {
      this.dateRange = dateRange;
      this.getTableData();
      this.getChartData();
    },

    getChartData() {
      // const condition = [];
      // const dateTime = this.dateRange;
      // if (dateTime[0]) condition.push(`time >= ${dateTime[0].getTime()}`);
      // if (dateTime[1]) condition.push(`time < ${dateTime[1].getTime()}`);
      // condition.push(`url = "${this.$route.params.url}"`);
      // gatewayAPI.getHistory({
      //   condition: JSON.stringify(condition)
      // }).then(res => {
      //   this.chartData = res.data.list;
      // });
    },

    getTableData() {
      this.tableLoading = true;
      const condition = [];
      const dateTime = this.dateRange;
      if (dateTime[0]) condition.push(`time >= ${dateTime[0].getTime()}`);
      if (dateTime[1]) condition.push(`time < ${dateTime[1].getTime()}`);
      condition.push(`url = "${this.$route.params.url}"`);

      gatewayAPI
        .getHistory({
          condition: JSON.stringify(condition)
        })
        .then(res => {
          this.tableData = res.data.list;
          this.pageInfo.total = res.data.total || res.data.length;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    goDetail({ message }) {
      this.$router.push({
        name: "error-detail",
        params: {
          searchKey: message
        }
      });
    }
  }
};
</script>
