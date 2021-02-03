<template>
  <div class="main">
    <div class="conatiner" v-if="sConfig">
      <el-row class="title">
        <el-col :span="4" class="u-center">告警类型</el-col>
        <el-col :span="12">告警阀值</el-col>
        <el-col :span="8">配置说明</el-col>
      </el-row>
      <el-row class="mt-16">
        <el-col :span="4" class="u-center">JS代码异常</el-col>
        <el-col :span="12">
          <div>
            <span>JS报错数达到：</span>
            <el-input-number
              size="mini"
              v-model="sConfig.code_error_count_threshold"
              controls-position="right"
              @change="handleChange"
              :min="1"
            />
            <span class="ml-4">次/时</span>
            <el-button class="ml-4" type="primary" size="small"
              >确认修改</el-button
            >
          </div>
        </el-col>
        <el-col :span="8" class="dec">
          <div class="lh-24">某一小时内JS报错总数达到阀值</div>
        </el-col>
      </el-row>
      <el-row class="mt-16">
        <el-col :span="4" class="u-center">接口响应异常</el-col>
        <el-col :span="12">
          <div>
            <span>接口响应异常：</span>
            <el-input-number
              size="mini"
              v-model="sConfig.http_error_count_threshold"
              controls-position="right"
              @change="handleChange"
              :min="1"
            />
            <span class="ml-4">次/时</span>
            <el-button class="ml-4" type="primary" size="small"
              >确认修改</el-button
            >
          </div>
        </el-col>
        <el-col :span="8" class="dec">
          <div class="lh-24">
            某一小时内接口响应报错总数达到阀值，该报错为HTTP状态码为4xx/5xx
          </div>
        </el-col>
      </el-row>
      <el-row class="mt-16">
        <el-col :span="4" class="u-center">接口响应超时</el-col>
        <el-col :span="12">
          <div>
            <span>接口响应超时：</span>
            <el-input-number
              size="mini"
              v-model="sConfig.http_timeout_count_threshold"
              controls-position="right"
              @change="handleChange"
              :min="1"
            />
            <span class="ml-4">次/时</span>
            <el-button class="ml-4" type="primary" size="small"
              >确认修改</el-button
            >
          </div>
        </el-col>
        <el-col :span="8" class="dec">
          <div class="lh-24">
            某一小时内接口响应超时总数达到阀值，该报错为接口响应时间超过5秒
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as AccountAPI from "@/apis/account";
export default {
  data() {
    return {
      sConfig: null
    };
  },

  created() {
    AccountAPI.getConfig().then(res => {
      console.log(res.data);
      this.sConfig = res.data;
    });
  },

  methods: {
    handleChange(v) {
      console.log(v);
    }
  }
};
</script>

<style lang="less" scoped>
.conatiner {
  /deep/ .el-row {
    display: flex;
    align-items: center;
    padding: 0 12px;
  }
  font-size: 12px;
  padding-bottom: 20px;
  border: 1px solid #f5f5f5;
}

.title {
  padding: 0 12px;
  height: 40px;
  line-height: 40px;
  font-weight: 500;
  background: #eee;
}
</style>
