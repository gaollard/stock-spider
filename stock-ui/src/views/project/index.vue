<template>
  <div>
    <div class="ui-flex mb-20">
      <div class="ui-inline-flex">
        <el-input
          class="u-sm-input"
          placeholder="输入应用名称"
          size="small"
          v-model="tableForm.searchKey"
        ></el-input>
        <el-button
          size="small"
          class="ml-10"
          type="primary"
          plain
          @click="refreshTable"
        >
          <i class="el-icon-search"></i>
          <span>搜索</span>
        </el-button>
      </div>
      <el-button type="primary" @click="handle(actionType.add)" size="small"
        >添加项目</el-button
      >
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      size="small"
      border
      tooltip-effect="light"
      row-class-name="pointer"
    >
      <el-table-column prop="name" label="应用名称" min-width="120" />
      <el-table-column prop="app_secret" label="secret" min-width="120" />
      <el-table-column prop="app_host" label="host" min-width="120" />
      <el-table-column prop="platform" label="运行平台" min-width="120" />
      <el-table-column label="创建时间" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            class="u-clickable"
            @click="handle(actionType.edit, scope.row)"
            type="text"
            size="mini"
            >编辑</el-button
          >
          <el-button
            class="u-clickable"
            @click="handle(actionType.del, scope.row)"
            type="text"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="ui-t-right mt-16"
      :page-size="pageInfo.pageSize"
      :current-page="pageInfo.pageIndex"
      :total="pageInfo.total"
      @current-change="onCurrentChange"
      background
      layout="prev, pager, next"
    />
    <ProjectForm
      v-model="dialogVisible"
      :detailData="detailData"
      :handleAction="handleAction"
      @refresh="getTableData"
    />
  </div>
</template>

<script>
import { projectAPI } from "@/apis/project";
import ProjectForm from "./common/project-form.vue";

const initPageInfo = {
  pageIndex: 1,
  pageSize: 15,
  total: 0
};

export default {
  components: {
    ProjectForm
  },
  data() {
    return {
      tableForm: {
        searchKey: ""
      },
      pageInfo: { ...initPageInfo },
      tableData: [],
      tableLoading: false,
      actionType: {
        add: "add",
        del: "del",
        edit: "edit"
      },
      handleAction: "",
      dialogVisible: false,
      detailData: {}
    };
  },

  created() {
    this.getTableData();
  },

  methods: {
    handle(actionType, row = null) {
      const { add, edit, del } = this.actionType;
      this.handleAction = actionType;
      this.detailData = row;

      switch (actionType) {
        case add:
          this.dialogVisible = true;
          break;
        case edit: {
          this.dialogVisible = true;
          break;
        }
        case del:
          this.$confirm(`是否删除“${row.name}”?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              projectAPI.projectDel({ id: row.id }).then(res => {
                this.$message.success("删除成功");
                this.getTableData();
              });
            })
            .catch(error => {
              console.log(error);
            });
      }
    },

    refreshTable() {
      this.pageInfo = { ...initPageInfo };
      this.getTableData();
    },

    onCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.getTableData();
    },

    getTableData() {
      this.tableLoading = true;
      return projectAPI
        .projectList({
          ...this.pageInfo,
          ...this.tableForm
        })
        .then(res => {
          this.tableData = res.data.list || [];
          this.pageInfo.total = res.data.pageInfo.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped></style>
