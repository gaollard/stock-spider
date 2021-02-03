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
    />
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
        prop="http_code"
        label="最近请求状态码"
        min-width="120"
      />
      <el-table-column label="最近请求时间" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.time | dateTime }}
        </template>
      </el-table-column>
      <el-table-column prop="count" label="请求次数" min-width="100" />
      <el-table-column prop="user_count" label="影响用户" min-width="100" />
    </el-table>
  </div>
</template>

<script>
import ErrorChart from "./common/error-chart.vue";
import DatetimePicker from "./common/datetime-picker.vue";
import { gatewayAPI } from "@/apis/gateway";
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
        pageSize: 15,
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

    onCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.getTableData();
    },

    getTableData() {
      this.tableLoading = true;
      return gatewayAPI
        .errorGroup({
          ...this.pageInfo,
          start_time: this.dateRange[0].getTime(),
          end_time: this.dateRange[1].getTime()
        })
        .then(res => {
          this.tableData = res.data.list || [];
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    goDetail({ url }) {
      this.$router.push({
        name: "gateway-error-item",
        params: {
          url
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
