<template>
  <div class="layout" :class="{ 'collpase-menu': $store.state.isCollapse }">
    <SideMenu class="sidebar" />
    <div class="main">
      <Header />
      <div class="content">
        <!-- <NavBar /> -->
        <router-view class="content-main mt-10" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/header/index.vue";
// import NavBar from "./components/navbar/index.vue";
import SideMenu from "./components/sidebar/index.vue";

export default {
  components: {
    Header,
    // NavBar,
    SideMenu
  },
  computed: {}
};
</script>

<style lang="less" scoped>
@import "../assets/style/vars.less";

.sidebar {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: @sidebar-width;
  height: 100%;
  background: #282c43;
  /deep/ .el-submenu .el-menu-item {
    min-width: @sidebar-width;
    height: 36px;
    line-height: 36px;
  }
  /deep/ .el-menu-item {
    font-size: 12px;
  }
  /deep/ .el-submenu__title {
    font-size: 12px;
    height: 44px;
    line-height: 44px;
  }
  /deep/ .el-submenu .el-menu-item {
    padding-left: 50px !important;
  }
}

.main {
  padding-left: @sidebar-width;
}

.content {
  padding: 16px;
  padding-top: 0;
}

.content-main {
  padding: 16px;
  background: #fff;
  border-radius: 4px;
}
</style>
