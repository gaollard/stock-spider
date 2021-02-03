<template>
  <div class="breadcrumb">
    <el-breadcrumb
      class="navbar"
      separator-class="el-icon-arrow-right"
      v-if="bList.length"
    >
      <el-breadcrumb-item
        class="bread-item"
        :class="getItemCls(item, index)"
        v-for="(item, index) in bList"
        :key="item.path"
      >
        <span @click="handleLink(item, index)">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { routes } from "@/router";
export default {
  data() {
    return {
      routes
    };
  },
  computed: {
    bList() {
      let res = null;
      const find = (list, path) => {
        list.forEach(item => {
          const curPath = [...path].concat(item);
          if (item.name === this.$route.name) {
            res = curPath;
          }
          item.children && find(item.children, curPath);
        });
      };

      find(routes, []);
      return res;
    }
  },
  methods: {
    handleLink(item, index) {
      if (index + 1 === this.bList.length) {
        return;
      }
      const { redirect } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push({
        name: item.name,
        params: this.$route.params
      });
    },
    getItemCls(item, index) {
      return {
        "is-current": index + 1 === this.bList.length
      };
    }
  }
};
</script>

<style lang="less" scoped>
.breadcrumb {
  padding: 10px 0;
}
.bread-item {
  cursor: pointer;
}
.navbar {
  /deep/ .el-breadcrumb__inner {
    font-size: 12px;
    &:hover {
      color: #333;
    }
  }
}
</style>
