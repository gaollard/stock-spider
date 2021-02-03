<template>
  <div class="menu-item" v-if="menu.meta && !menu.meta.hidden">
    <template v-if="!hasChildren(menu)">
      <el-menu-item :index="getMenuIndex(menu)" @click="gotoPath(menu)">
        <template slot="title">
          <i class="menu-icon mr-10" :class="menu.meta.icon" v-if="showIcon" />
          <span class="menu-text" slot="title">{{ menu.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <template v-else>
      <el-submenu :index="getMenuIndex(menu)">
        <template slot="title">
          <i
            class="menu-icon mr-10"
            :class="menu.meta.icon"
            v-if="showIcon"
          ></i>
          <span class="menu-text" slot="title">{{ menu.meta.title }}</span>
        </template>
        <child-menu
          v-for="child in menu.children"
          :key="child.name"
          :menu="child"
          :show-icon="false"
        />
      </el-submenu>
    </template>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "child-menu",
  props: {
    menu: {
      type: Object,
      default: null
    },
    "show-icon": {
      type: Boolean,
      default: true
    }
  },

  created() {
    this.$watch("menu", v => {
      console.log(v);
    });
  },

  methods: {
    getMenuIndex($route) {
      return $route.name;
    },

    hasChildren(menu) {
      if (!menu.children) return false;
      return !!menu.children.filter(menu => menu.meta && !menu.meta.hidden)
        .length;
    },

    gotoPath(route) {
      if (route.name !== this.$route.name) {
        this.$router.push({ name: route.name });
      }
    },

    hasPermission(route) {
      return true;
    }
  }
};
</script>

<style lang="less" scoped>
.menu {
  border-right: 0;
}

.menu-icon {
  font-size: 20px;
}

.menu-text {
  font-size: 12px;
}

.menu-item {
  /deep/ .el-submenu.is-active {
    .menu-icon {
      color: rgb(252, 101, 47);
    }
  }
}
</style>
