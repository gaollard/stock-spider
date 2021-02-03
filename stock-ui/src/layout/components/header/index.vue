<template>
  <div class="header">
    <!-- <div class="role-switch mr-10">
      <el-dropdown>
        <span class="el-dropdown-link">
          <span>{{ currentRole[0] }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="role in roles" :key="role">
            <span>{{ role }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->
    <div class="form-project">
      <el-select size="mini" v-model="project" placeholder="请选择">
        <el-option
          v-for="item in projectList"
          :key="item.app_secret"
          :label="item.name"
          :value="item.app_secret"
        >
        </el-option>
      </el-select>
    </div>
    <el-dropdown v-if="userInfo" trigger="click">
      <span class="el-dropdown-link user-box pointer">
        <img class="user-avatar" :src="userInfo.avatar" />
        <span class="user-name ml-10">{{ userInfo.nickname }}</span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <span @click="handleLoginOut">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { projectAPI } from "@/apis/project";
export default {
  computed: {
    roles() {
      return this.$store.state.user.roles;
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    currentRole() {
      return this.$store.state.user.currentRole;
    },
    projectList() {
      return this.$store.state.projectList;
    },
    project: {
      set(v) {
        this.$store.commit("setProject", v);
      },
      get() {
        return this.$store.state.project;
      }
    }
  },
  methods: {
    handleLoginOut() {
      this.$store.dispatch("user/loginOut").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 20px;
  background: #fff;
  justify-content: flex-end;
}

.form-project {
  width: 180px;
}

.user-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .user-avatar {
    width: 20px;
    height: 20px;
  }
}
</style>
