<template>
  <el-dialog
    :title="(isAdd ? '添加' : '编辑') + '用户'"
    :visible.sync="visible"
    width="40%"
  >
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item prop="username" label="账户">
        <el-input v-model="formData.username" placeholder="账户" />
      </el-form-item>
      <!-- <template v-if="isAdd"> -->
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="formData.password"
          :disabled="!isAdd"
          placeholder="密码"
        />
      </el-form-item>
      <!-- </template> -->
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model="formData.mobile" placeholder="手机号" />
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" placeholder="邮箱" />
      </el-form-item>
      <el-form-item prop="email" label="角色">
        <el-select v-model="formData.roles" placeholder="请选择" multiple>
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="handleConfirm"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import * as util from "@/utils/index";
import * as RoleAPI from "@/apis/ums-role";
import * as AdminAPI from "@/apis/admin";

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      visible: this.value,
      roleList: [],
      formData: {
        username: "frank1",
        password: util.generatorPwd(),
        mobile: "13249064450",
        email: "1056834607@qq.com",
        roles: []
      }
    };
  },
  computed: {
    isAdd() {
      return !this.detail;
    }
  },
  watch: {
    value(v) {
      this.visible = v;
    },
    visible(v) {
      this.$emit("input", v);
    },
    detail(v) {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = this.detail[key];
        if (key === "roles") {
          this.formData[key] = this.detail[key].map(el => el.roleId);
        }
      });
    }
  },
  created() {
    RoleAPI.roleListAll().then(res => {
      this.roleList = res.data.list;
    });
    if (this.detail) {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = this.detail[key];
        if (key === "roles") {
          this.formData[key] = this.detail[key].map(el => el.roleId);
        }
      });
    }
  },
  methods: {
    handleConfirm() {
      const sFn = meg => {
        this.$message({
          type: "success",
          message: "创建成功"
        });
        this.visible = false;
        this.$emit("refresh");
      };
      if (this.isAdd) {
        AdminAPI.adminAdd(this.formData).then(res => {
          if (res.success) sFn();
        });
      } else {
        AdminAPI.adminEdit(this.detail.id, this.formData).then(res => {
          if (res.success) sFn();
        });
      }
    }
  }
};
</script>
