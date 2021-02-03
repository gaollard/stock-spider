<template>
  <el-dialog
    :title="`${isAdd ? '新增' : '编辑'}用户`"
    :visible.sync="visable"
    width="550px"
  >
    <el-form ref="form" :model="form" label-position="top" size="small">
      <el-form-item label="用户名" required>
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" required>
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visable = false" size="small">取 消</el-button>
      <el-button type="primary" @click="submit" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { adminAPI } from "@/apis/admin";

const initForm = {
  username: "",
  password: "",
  email: "",
  id: ""
};

export default {
  props: {
    value: {
      type: Boolean
    },
    handleAction: {
      type: String,
      default: "add"
    },
    detailData: {
      type: Object
    }
  },
  data() {
    return {
      form: { ...initForm },
      visable: false
    };
  },
  computed: {
    isAdd() {
      return this.handleAction === "add";
    }
  },
  watch: {
    value(v) {
      this.visable = v;
      if (!this.isAdd && v) {
        Object.keys(this.form).forEach(key => {
          this.form[key] = this.detailData[key];
        });
        this.form.password = "******";
      }
    },
    visable(v) {
      this.$emit("input", v);
      if (!v) {
        this.resetForm();
        this.$nextTick(() => {
          this.$refs["form"].resetFields();
        });
      }
    }
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.form));
          if (!this.isAdd) {
            if (this.form.password === "******") {
              delete params["password"];
            }
          }
          const fun = this.isAdd ? "adminAdd" : "adminEdit";
          adminAPI[fun](params).then(res => {
            this.$message.success(`${this.isAdd ? "新增" : "编辑"}成功`);
            this.visable = false;
            this.$emit("refresh");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm() {
      this.form = { ...initForm };
    }
  }
};
</script>
