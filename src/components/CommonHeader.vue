<template>
  <div class="header-container">
    <!-- 左显示区 -->
    <div class="l-content">
      <!-- 菜单按钮 -->
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
        style="margin-right: 20px"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tabsList"
          :key="item.name"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- 右显示区 -->
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.png" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  name: "CommonHeader",
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },

    // 登出
    handleClick(command) {
      if (command === "logout") {
        // 清除cookie中的token值
        Cookie.remove("token");
        // 清除cookie中的menu值
        Cookie.remove("menu");
        // 跳转至登录页
        this.$router.push("/login");
      }
    },
  },
  computed: {
    tabsList() {
      return this.$store.state.tab.tabsList;
    },
  },
  mounted() {
    // console.log(this.tabsList);
  },
};
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    align-items: center;
    // 样式穿刺
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        // &是并且的意思
        &.is-link {
          color: #666;
        }
      }
      // 最后一个子元素
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>
