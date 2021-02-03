<template>
  <div>
    <div class="ui-flex mb-20">
      <div class="ui-inline-flex">
        <el-input
          class="u-sm-input"
          placeholder="输入用户名称"
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
        >添加用户</el-button
      >
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      size="small"
      border
      tooltip-effect="light"
    >
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | formatTime }}
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

    <UserForm
      v-model="dialogFormVisible"
      :detailData="detailData"
      :handleAction="handleAction"
      @refresh="getTableData"
    />
  </div>
</template>

<script>
import { adminAPI } from "@/apis/admin";
import UserForm from "./common/user-form.vue";

const initPageInfo = {
  pageIndex: 1,
  pageSize: 15,
  total: 0
};

export default {
  components: {
    UserForm
  },
  data() {
    return {
      tableForm: {
        searchKey: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      tableLoading: false,
      dialogFormVisible: false,
      actionType: {
        add: "add",
        edit: "edit",
        del: "del"
      },
      handleAction: "",
      detailData: null
    };
  },

  created() {
    this.getTableData();
  },

  methods: {
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
      return adminAPI
        .adminList({
          ...this.pageInfo
        })
        .then(res => {
          this.tableData = res.data.list || [];
          this.pageInfo.total = res.data.total || res.data.length;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    handle(actionType, row) {
      const { add, edit, del } = this.actionType;
      switch (actionType) {
        case add:
          this.dialogFormVisible = true;
          this.handleAction = add;
          break;
        case edit: {
          this.handleAction = edit;
          // const res = await adminAPI.adminDetail(row.id);
          this.detailData = row;
          this.dialogFormVisible = true;
          break;
        }
        case del:
          this.$confirm(`是否删除“${row.username}”?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              adminAPI.adminDelete(row.id).then(res => {
                this.$message.success("删除成功");
                this.getTableData();
              });
            })
            .catch(error => {
              console.log(error);
            });
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
