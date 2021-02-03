<template>
  <div>
    <div class="search-form mb-20">
      <el-button size="small" type="primary" @click="handlePatchDelete">
        <span>批量删除</span>
      </el-button>
    </div>
    <SmartTable
      ref="table"
      :columns="columns"
      :getDataList="getDataList"
      align="center"
    >
      <template slot-scope="scope" slot="user">
        <span>{{ scope.row.user ? scope.row.user.id : "-" }}</span>
      </template>
      <template slot-scope="scope" slot="loginTime">
        <span>{{ scope.row.loginTime | dateTime }}</span>
      </template>
      <template slot-scope="scope" slot="createTime">
        <span>{{ scope.row.createTime | dateTime }}</span>
      </template>
      <el-table-column label="操作" align="center" slot="action">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </SmartTable>
    <EditDialog
      v-model="editVisible"
      @confirm="confirmEdit"
      :detail="rowData"
      @refresh="refresh"
    />
  </div>
</template>

<script>
import * as AdminAPI from "@/apis/admin";
import EditDialog from "./edit-dialog.vue";
import SmartTable from "@/bizeUI/table/table.vue";
import * as ReturnOrderApplyAPI from "@/apis/oms-order-return-apply";

export default {
  components: {
    EditDialog,
    SmartTable
  },
  data() {
    return {
      editVisible: false,
      rowData: null,
      columns: [
        {
          prop: "id",
          label: "ID"
        },
        {
          prop: "shipId",
          label: "退货单号"
        },
        {
          prop: "orderId",
          label: "订单 ID"
        },
        {
          prop: "user",
          label: "订单用户"
        },
        {
          prop: "createTime",
          label: "创建时间",
          minWidth: 100
        }
      ]
    };
  },
  mounted() {
    this.$refs.table.getTableData();
  },
  methods: {
    getDataList: ReturnOrderApplyAPI.returnOrderApplyList,
    refresh() {
      this.$refs.table.refresh();
    },
    handlePatchDelete() {},
    handleAdd() {
      this.rowData = null;
      this.editVisible = true;
    },
    handleEdit(row) {
      this.rowData = row;
      this.editVisible = true;
    },
    confirmEdit(formData) {
      AdminAPI.adminAdd(formData).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.search-form {
  text-align: right;
}
</style>
