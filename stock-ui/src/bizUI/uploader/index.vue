<template>
  <div class="editor">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      :action="qiniuDomain"
      :http-request="upLoadToQiniu"
      :show-file-list="false"
      :before-upload="beforeUpload"
    >
      <img v-if="model.icon" :src="model.icon" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- <el-button @click="submitUpload">submitUpload</el-button> -->
  </div>
</template>

<script>
import * as commonAPI from "@/apis/common";
import { instance } from "@/utils/request";

export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      // 实名认证后创建的存储空间对应的上传地址(华东，华南等等不一样：https://developer.qiniu.com/kodo/manual/1671/region-endpoint)
      qiniuDomain: "https://upload-z2.qiniup.com", // 创建成功后官方随机分配的公开图片地址前缀，即上传成功后对应的公用图片地址前缀
      // qiniuViewHost: "http://q0sm6ce42.bkt.clouddn.com",
      qiniuViewHost: "http://c1.airtlab.com",
      model: {
        name: "",
        icon: this.value
      }
    };
  },

  watch: {
    value(val) {
      this.model.icon = val;
    }
  },

  created() {
    commonAPI.qiniuToken().then(res => {
      this.token = res.data.token;
    });
  },

  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    async upLoadToQiniu(req) {
      let fileType = "";
      if (req.file.type === "image/png") {
        fileType = "png";
      } else {
        fileType = "jpg";
      }

      // 重命名要上传的文件
      const keyname = `${new Date().getTime()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileType}`;

      const formdata = new FormData();
      formdata.append("file", req.file);
      formdata.append("token", this.token);
      formdata.append("key", keyname);

      console.log(formdata);
      instance({
        url: this.qiniuDomain,
        method: "POST",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.model.icon = `${this.qiniuViewHost}/${res.key}`;
        this.$emit("input", this.model.icon);
      });
      // const result = await this.$http.post(this.qiniuDomain, formdata, config);
    },

    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message({
          showClose: true,
          message: "上传图片只能是JPG/PNG 格式!",
          type: "error"
        });
      }

      if (!isLt10M) {
        this.$message({
          showClose: true,
          message: "上传头像图片大小不能超过 10MB!",
          type: "error"
        });
      }
      return isJPG && isLt10M;
    }
  }
};
</script>

<style lang="css" scoped>
.avatar {
  width: 300px;
}
</style>
