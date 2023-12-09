<template>
  <div>
    <el-container>
      <el-aside width="auto"><CommonAside /></el-aside>
      <el-container>
        <el-header>
          <CommonHeader />
        </el-header>
        <CommonTag />
        <el-main>
          <!-- 子路由出口 -->
          <router-view></router-view
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";
import CommonTag from "../components/CommonTag";
export default {
  name: "Main",
  components: { CommonAside, CommonHeader, CommonTag },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>