<template>
  <div>
    <el-table
      v-loading="tableLoading"
      ref="mTable"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="small"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      :default-sort="{
        prop: sortField,
        order: sortDirection
      }"
    >
      <el-table-column type="selection" min-width="55"> </el-table-column>
      <el-table-column label="索引" type="index" min-width="55">
      </el-table-column>
      <el-table-column label="日期" min-width="100">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="代码"
        min-width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="title" label="名称" min-width="120">
      </el-table-column>
      <el-table-column
        prop="day_grow"
        label="日涨幅"
        sortable="custom"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="week_grow"
        label="周涨幅"
        sortable="custom"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="month_grow"
        label="月涨幅"
        sortable="custom"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="three_month_grow"
        label="3月涨幅"
        sortable="custom"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="six_month_grow"
        label="6月涨幅"
        sortable="custom"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="year_grow"
        label="年涨幅"
        sortable="custom"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="two_year_grow"
        label="2年涨幅"
        sortable="custom"
        min-width="100"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      small
      layout="total, sizes, prev, pager, next"
      :page-sizes="[15, 20, 50, 100]"
      class="ui-t-right mt-16"
      :page-size="pageSize"
      :current-page="pageIndex"
      :total="count"
      @current-change="onCurrentChange"
      @size-change="handleSizeChange"
      background
    />
  </div>
</template>

<script>
import { request } from "@/utils/request";
export default {
  data() {
    return {
      tableData: [],
      tableLoading: false,
      mSelection: [],
      pageIndex: 1,
      pageSize: 15,
      count: 0,
      sortField: "day_grow",
      sortDirection: "descending"
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.tableLoading = true;
      request({
        url: "/fund",
        query: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          sortField: this.sortField,
          sortDirection: this.sortDirection === "descending" ? "DESC" : "ASC"
        }
      })
        .then(res => {
          this.count = res.data.count;
          this.tableData = res.data.list;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.mTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.mTable.clearSelection();
      }
    },
    handleSortChange(v) {
      this.sortField = v.prop;
      this.sortDirection = v.order || "";
      this.getTableData();
    },
    handleSelectionChange(val) {
      this.mSelection = val;
    },
    onCurrentChange(num) {
      this.pageIndex = num;
      this.getTableData();
    },
    handleSizeChange(num) {
      this.pageIndex = 1;
      this.pageSize = num;
      this.getTableData();
    }
  }
};
</script>
