<template>
  <div class="order-list">
    <div class="u-text-right mb-16">
      <el-button size="small" @click="handleAdd">发货</el-button>
      <el-button size="small" @click="handleAdd">关闭</el-button>
      <el-button size="small" @click="handleAdd">删除</el-button>
    </div>
    <el-table
      ref="table"
      :data="tableData"
      v-loading="tableLoading"
      :max-height="tableMaxHeight"
      size="small"
      row-key="id"
      border
      :default-expand-all="false"
      tooltip-effect="light"
    >
      <el-table-column type="expand" fixed>
        <template slot-scope="props">
          <div v-for="(item, index) in props.row.productList" :key="index">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ item.productName }}</span>
              </el-form-item>
              <el-form-item label="商品品牌">
                <span>{{ item.productBrand }}</span>
              </el-form-item>
              <el-form-item label="所选规格">
                <span v-for="(spec, index) in item.productSpec" :key="index">
                  <span class="mr-6">{{ spec.value }}</span>
                </span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>¥{{ item.productPrice }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <img width="120px" :src="item.productPic" alt />
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        min-width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="orderSn"
        label="订单编号"
        min-width="160"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="orderStatusName"
        label="订单状态"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="totalAmount"
        label="订单金额"
        min-width="120"
        align="center"
      >
        <template slot-scope="scope">¥{{ scope.row.totalAmount }}</template>
      </el-table-column>
      <el-table-column
        prop="orderTypeName"
        label="订单类型"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sourceTypeName"
        label="订单来源"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="payTypeName"
        label="支付状态"
        min-width="120"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.payTypeName }}</template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="下单时间"
        min-width="150"
        align="center"
      >
        <template slot-scope="scope">{{
          scope.row.createTime | dateTime
        }}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.note || "-" }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="small" @click="handlDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="u-text-right mt-16"
      :page-size="pageInfo.pageSize"
      :current-page="pageInfo.pageIndex"
      :total="pageInfo.total"
      @current-change="onCurrentChange"
      background
      layout="prev, pager, next"
    />
  </div>
</template>

<script>
import * as productApi from "@/apis/product";
import * as orderAPI from "@/apis/oms-order";
import SmartTable from "@/mixins/smart-table";

export default {
  mixins: [SmartTable],
  data() {
    return {
      tableForm: {},
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      tableLoading: false
    };
  },

  mounted() {
    this.initTableData();
  },

  methods: {
    initTableData() {
      this.tableLoading = true;
      orderAPI
        .omsOrderList({
          ...this.pageInfo
        })
        .then(res => {
          this.tableData = res.data.list;
          this.pageInfo.total = res.data.total;
        })
        .finally(() => {
          this.tableLoading = false;
          this.relayoutTable();
        });
    },
    handleAdd() {
      this.$router.push({ name: "addGoodsCategory" });
    },
    handleEdit(row) {
      this.$router.push({
        name: "editGoodsCategory",
        params: {
          categoryId: row.id
        }
      });
    },
    handlDelete(row) {
      productApi
        .productCategotyDelete(row.id)
        .then(res => {
          console.log(res);
        })
        .finally(() => {
          this.initTableData();
        });
    },
    onCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.initTableData();
    }
  }
};
</script>

<style lang="less" scoped>
.product-icon {
  width: 40px;
  height: 20px;
}
.order-list {
  /deep/ .el-form-item__label {
    color: #99a9bf;
    line-height: 30px;
  }
  /deep/ .el-form-item__content {
    line-height: 30px;
  }
  /deep/ .el-form-item {
    margin-bottom: 10px;
  }
}
</style>
