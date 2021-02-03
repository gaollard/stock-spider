<template>
  <div>
    <div class="table-filter" slot="tableFilter"></div>
    <div class="table-list">
      <el-table
        style="width: 100%"
        :data="tableData"
        :size="size"
        border
        v-loading="fLoading"
      >
        <template v-if="selection">
          <el-table-column type="selection" width="55"></el-table-column>
        </template>
        <template v-for="column in columns">
          <el-table-column
            :min-width="column.minWidth"
            :prop="column.prop"
            :label="column.label"
            :width="column.width || ''"
            :key="column.prop"
            :align="column.align || align"
          >
            <template slot-scope="scope">
              <slot :name="column.prop" :row="scope.row">
                <span>{{ scope.row[column.prop] }}</span>
              </slot>
            </template>
          </el-table-column>
        </template>
        <slot name="action"></slot>
      </el-table>
    </div>
    <div class="table-pagination text-right">
      <el-pagination
        class="u-text-right mt-16"
        :page-size="pageInfo.pageSize"
        :current-page="pageInfo.pageIndex"
        :total="total"
        @current-change="onCurrentChange"
        background
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: "small"
    },
    getDataList: {
      type: Function,
      default: () => {}
    },
    selection: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: "left"
    }
  },
  data() {
    return {
      total: 0,
      fLoading: false,
      tableData: [],
      pageInfo: {
        pageSize: 20,
        pageIndex: 1
      }
    };
  },
  methods: {
    getTableData() {
      this.fLoading = true;
      this.getDataList({
        ...this.pageInfo
      })
        .then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .finally(() => {
          this.fLoading = false;
        });
    },
    refresh() {
      this.pageInfo.pageIndex = 1;
      this.getTableData();
    },
    onCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.getTableData();
    }
  }
};
</script>
