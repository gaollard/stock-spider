<template>
  <div class="main">
    <div class="conatiner" v-if="sConfig">
      <el-row class="title">
        <el-col :span="4" class="u-center">配置属性</el-col>
        <el-col :span="12">属性内容</el-col>
        <el-col :span="8">配置说明</el-col>
      </el-row>
      <el-row class="mt-16">
        <el-col :span="4" class="u-center">日志服务状态</el-col>
        <el-col :span="12">
          <div>
            <el-switch />
          </div>
        </el-col>
        <el-col :span="8" class="dec">
          <div class="lh-24">
            <div>1. 可以关闭或开启日志服务。</div>
            <div>2. 关闭后，日志将不再入库，但是客户端会继续上传。</div>
            <div>3. 使用场景：更新代码、并发量过高、数据库连接爆满。</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="mt-16">
        <el-col :span="4" class="u-center">日志上报频率</el-col>
        <el-col :span="12">
          <div>
            <el-input-number
              size="mini"
              v-model="sConfig.http_error_count_threshold"
              controls-position="right"
              @change="handleChange"
              :min="1"
            />
            <span class="ml-4">秒/次</span>
          </div>
        </el-col>
        <el-col :span="8" class="dec">
          <div class="lh-24">
            <div>
              1.如果日志并发过高，可以手动调节日志的上报频率，以缓解服务器压力。
            </div>
            <div>2. 默认频率是 8秒/次， 重启服务后恢复至默认值。</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="mt-16">
        <el-col :span="4" class="u-center">日志存储周期</el-col>
        <el-col :span="12">
          <div>
            <el-input-number
              size="mini"
              v-model="sConfig.http_error_count_threshold"
              controls-position="right"
              @change="handleChange"
              :min="1"
            />
            <span class="ml-4">天</span>
          </div>
        </el-col>
        <el-col :span="8" class="dec">
          <div class="lh-24">
            <div>1. 系统会定期删除过期数据。</div>
            <div>2. 如果用户的日活量较高，不建议存储太长的时间。</div>
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
