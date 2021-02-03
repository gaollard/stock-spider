<template>
  <div class="category-edit">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item class="u-md-form-item" label="分类名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item class="u-md-form-item" label="上级分类" prop="parent_id">
        <el-cascader
          @change="handleParentChange"
          :value="ruleForm.parent_id"
          :options="categoryOptions"
          :props="{ checkStrictly: true }"
          clearable
        />
      </el-form-item>
      <el-form-item class="u-md-form-item" label="分类图标" prop="logo">
        <bize-uploader class="uploader" v-model="ruleForm.logo" />
        <el-input v-model="ruleForm.logo" />
      </el-form-item>
      <el-form-item class="u-md-form-item" label="排序值" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item class="u-md-form-item" label="关键词" prop="keyword">
        <el-input v-model="ruleForm.keyword"></el-input>
      </el-form-item>
      <el-form-item class="u-md-form-item" label="分类描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" rows="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')"
          >立即提交</el-button
        >
        <el-button size="small" @click="resetForm('ruleForm')"
          >重置表单</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as productAPI from "@/apis/product";
import BizeUploader from "@/bizeUI/uploader/n.vue";

export default {
  components: {
    BizeUploader
  },

  data() {
    return {
      ruleForm: {
        name: "",
        parent_id: "",
        logo: "",
        keyword: "",
        desc: "",
        sort: 999
      },
      categoryOptions: [],
      rules: {
        name: [
          { required: true, message: "输入分类名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "blur" }
        ]
        // desc: [{ required: true, message: "填写分类描述", trigger: "blur" }],
        // logo: [{ required: true, message: "上传分类图标", trigger: "blur" }]
      }
    };
  },

  computed: {
    categoryId() {
      return this.$route.params.categoryId;
    }
  },

  mounted() {
    this.getCategoryList();
    if (this.categoryId) {
      productAPI.productCategotyDetail(this.categoryId).then(res => {
        const data = res.data;
        Object.keys(data).forEach(key => {
          if (this.ruleForm[key] !== undefined) {
            this.ruleForm[key] = data[key];
          }
        });
      });
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addProductCategory();
        } else {
          console.warn("error submit!!");
          return false;
        }
      });
    },

    handleParentChange(val) {
      this.ruleForm.parent_id = val[val.length - 1];
    },

    addProductCategory() {
      if (!this.categoryId) {
        productAPI.productCategotyAdd(this.ruleForm).then(res => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$router.back();
        });
      } else {
        productAPI
          .productCategotyEdit(this.categoryId, this.ruleForm)
          .then(res => {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.$router.back();
          });
      }
    },

    getCategoryList() {
      productAPI.productCategotyList({ pageSize: 0 }).then(res => {
        const list = res.data.list.map(element => {
          return {
            value: element._id,
            label: element.name,
            parentId: element.parent_id
          };
        });
        list.forEach(itemP => {
          const parent = list.find(itemC => itemC.value === itemP.parentId);
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(itemP);
          }
        });
        this.categoryOptions = list.filter(el => el.parentId === "");
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.category-edit {
  /deep/ .avatar {
    width: 100px;
  }
}
</style>
