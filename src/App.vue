<template>
  <div>
    <!-- 主路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
// 清除样式
html,
body,
h3,
p {
  padding: 0;
  margin: 0;
}
</style>