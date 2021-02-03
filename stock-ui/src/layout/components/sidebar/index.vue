<template>
  <el-menu
    class="menu"
    :collapse="$store.state.isCollapse"
    :unique-opened="true"
    :default-active="activeMenu"
    background-color="#282c43"
    text-color="#fff"
    active-text-color="#fc652f"
  >
    <MenuItem
      v-for="item in routes"
      :menu="item"
      :key="item.name"
      :routes="routes"
    />
  </el-menu>
</template>

<script>
import { routes } from "@/router";
import MenuItem from "./menu-item";

export default {
  components: {
    MenuItem
  },
  data() {
    return {
      routes
    };
  },
  computed: {
    activeMenu() {
      for (let index = this.bList.length - 1; index > -1; index--) {
        if (!this.bList[index].meta.hidden) {
          return this.bList[index].name;
        }
      }
      return this.$route.name;
    },
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
  }
};
</script>

<style scoped>
.menu {
  border-right: 0;
}
</style>
