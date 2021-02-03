<template>
  <div>
    <div class="table-form mb-10 ui-t-right">
      <DatetimePicker ref="datetimeRef" @change="onDateChange" />
    </div>
    <ErrorChart class="mb-10" ref="chart" :dateRange="dateRange" />
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      size="small"
      border
      tooltip-effect="light"
      row-class-name="pointer"
    >
      <el-table-column prop="message" label="错误信息" min-width="200">
        <template slot-scope="{ row }">
          <span class="ui-pointer" @click="goDetail(row)">{{
            row.message
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="错误类型" min-width="90" />
      <el-table-column label="最近时间" min-width="90">
        <template slot-scope="scope">
          {{ scope.row.time | dateTime }}
        </template>
      </el-table-column>
      <el-table-column prop="count" label="事件数" min-width="60" />
      <el-table-column prop="user_count" label="用户数" min-width="60" />
    </el-table>
  </div>
</template>

<script>
import { errorAPI } from "@/apis/error";
import DatetimePicker from "./common/datetime-picker.vue";
import ErrorChart from "./common/error-chart.vue";

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
      dateRange: [new Date(Date.now() - 3600 * 1000 * 24 * 1), new Date()],
      chartData: []
    };
  },

  created() {
    this.initTableData();
    this.getChartData();
  },

  methods: {
    async onDateChange() {
      const dateRange = this.$refs.datetimeRef.value;
      this.dateRange = dateRange;
      this.initTableData();
      this.getChartData();
    },

    getChartData() {
      // const params = {
      //   pageSize: 0,
      //   fileds: "time"
      // };
      // const dateTime = this.dateRange;
      // if (dateTime[1]) params.end_time = dateTime[1].getTime();
      // if (dateTime[0]) params.start_time = dateTime[0].getTime();
      // errorAPI.errorList(params).then(res => {
      //   this.chartData = res.data.list;
      // });
    },

    initTableData() {
      this.tableLoading = true;
      const dateRange = this.dateRange;
      return errorAPI
        .errorGroupList({
          ...this.pageInfo,
          start_time: dateRange[0].getTime(),
          end_time: dateRange[1].getTime()
        })
        .then(res => {
          this.tableData = res.data || [];
          this.pageInfo.total = res.data.total || res.data.length;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    goDetail({ message }) {
      this.$router.push({
        name: "code-error-detail",
        params: {
          searchKey: message
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.table-form {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
