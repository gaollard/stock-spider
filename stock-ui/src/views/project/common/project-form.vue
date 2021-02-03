<template>
  <el-dialog
    :title="`${handleAction === 'add' ? '新增' : '编辑'}应用`"
    :visible.sync="visable"
    width="550px"
  >
    <el-form ref="form" label-position="top" :model="form" size="small">
      <el-form-item label="应用名" required>
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="host" required>
        <el-input v-model="form.app_host" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密钥" required>
        <div class="ui-flex ui-flex-start">
          <el-input
            class="mr-10"
            v-model="form.app_secret"
            autocomplete="off"
          />
          <el-button type="primary" size="small" @click="refreshKey"
            >刷新</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="运行平台" required>
        <el-input
          v-model="form.platform"
          autocomplete="off"
          :disabled="handleAction === 'edit'"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visable = false" size="small">取 消</el-button>
      <el-button type="primary" @click="submit" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { projectAPI } from "@/apis/project";
import randomString from "string-random";

const initForm = {
  name: "",
  platform: "javascript",
  app_host: "",
  app_secret: "",
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

  watch: {
    value(v) {
      this.visable = v;
      if (this.handleAction === "edit" && v) {
        Object.keys(this.form).forEach(key => {
          this.form[key] = this.detailData[key];
        });
      }
      if (this.handleAction === "add" && v) {
        this.refreshKey();
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

  created() {
    this.refreshKey();
  },

  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          projectAPI.projectAdd(this.form).then(res => {
            this.$message.success(
              `${this.handleAction === "add" ? "新增" : "编辑"}成功`
            );
            this.visable = false;
            this.$emit("refresh");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    refreshKey() {
      this.form.app_secret = randomString(16, true);
    },

    resetForm() {
      this.form = { ...initForm };
    }
  }
};
</script>

<style lang="less" scoped></style>
