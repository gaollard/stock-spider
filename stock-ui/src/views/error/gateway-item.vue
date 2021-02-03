<template>
  <div>
    <div class="table-form mb-10 ui-t-right">
      <DatetimePicker ref="datetimeRef" @change="onDateChange" />
    </div>
    <ErrorChart
      class="mb-10"
      ref="chart"
      :dateRange="dateRange"
      :isCodeError="false"
      :message="$route.params.url"
    />
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
      <el-table-column prop="spend_time" label="消耗时间" min-width="100" />
      <el-table-column prop="http_code" label="状态码" min-width="100" />
    </el-table>
  </div>
</template>

<script>
import { gatewayAPI } from "@/apis/gateway";
import * as echarts from "echarts";
import ErrorChart from "./common/error-chart.vue";
import DatetimePicker from "./common/datetime-picker.vue";
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
      dateRange: [new Date(Date.now() - 3600 * 1000 * 24 * 1), new Date()]
    };
  },

  created() {
    this.getTableData();
  },

  methods: {
    async onDateChange() {
      const dateRange = this.$refs.datetimeRef.value;
      this.dateRange = dateRange;
      this.getTableData();
    },

    getTableData() {
      this.tableLoading = true;
      return gatewayAPI
        .getUrlErrorHistory({
          ...this.pageInfo,
          url: this.$route.params.url,
          start_time: this.dateRange[0].getTime(),
          end_time: this.dateRange[1].getTime()
        })
        .then(res => {
          this.tableData = res.data.list;
          this.pageInfo.total = res.data.total || res.data.length;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    }
  }
};
</script>
