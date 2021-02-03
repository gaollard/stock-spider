<template>
  <div>
    <el-upload
      ref="upload"
      list-type="picture-card"
      :auto-upload="false"
      :action="qiniuDomain"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <div class="text-center">
        <img class="dialog-img" :src="dialogImageUrl" alt />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as commonAPI from "@/apis/common";
import { instance } from "@/utils/request";

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      // 实名认证后创建的存储空间对应的上传地址(华东，华南等等不一样：https://developer.qiniu.com/kodo/manual/1671/region-endpoint)
      qiniuDomain: "https://upload-z2.qiniup.com", // 创建成功后官方随机分配的公开图片地址前缀，即上传成功后对应的公用图片地址前缀
      // qiniuViewHost: "http://q0sm6ce42.bkt.clouddn.com",
      qiniuViewHost: "http://c1.airtlab.com",
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: this.value
    };
  },

  watch: {
    value(val) {
      this.fileList = val;
    },
    fileList(val) {
      this.$emit("input", val);
    }
  },

  created() {
    commonAPI.qiniuToken().then(res => {
      this.token = res.data.token;
    });
  },

  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList;
      this.upLoadToQiniu(file, fileList.indexOf(file));
    },
    handleRemove(file, fileList) {
      console.log("removed", file);
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    async upLoadToQiniu(req, index) {
      const file = req.raw;
      let fileType = "";
      if (file.type === "image/png") {
        fileType = "png";
      } else {
        fileType = "jpg";
      }

      // 重命名要上传的文件
      const keyname = `${new Date().getTime()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileType}`;

      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("token", this.token);
      formdata.append("key", keyname);

      instance({
        url: this.qiniuDomain,
        method: "POST",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          console.log("success", index, res);
          this.fileList[index].url = `${this.qiniuViewHost}/${res.key}`;
          this.fileList = JSON.parse(JSON.stringify(this.fileList));
          this.$emit("input", this.fileList);
        })
        .catch(err => {
          console.log(err);
        });
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
.dialog-img {
  height: 300px;
}
</style>
