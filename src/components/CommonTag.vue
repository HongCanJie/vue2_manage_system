<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(item, index) in tabs"
      :key="index"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTabs",
  computed: {
    ...mapState({
      tabs: (state) => state.tab.tabsList,
    }),
  },
  mounted() {
    // console.log(this.$route);
  },
  methods: {
    ...mapMutations(["closeTag"]),
    // tag路由跳转
    changeMenu(item) {
      //   console.log(item);
      this.$router.push(item.name);
    },
    // tag删除
    handleClose(item, index) {
      //   console.log(item);
      // 调用vuex方法删除对应的数据
      this.closeTag(item);
      //   未删除前的tabsList的数组长度-1
      const length = this.tabs.length;
      // 判断删除后的路由跳转规则
      if (item.name !== this.$route.name) {
        // 删除的不是当前显示的路由时
        return;
      }
      if (index === length) {
        // 删除最后一个路由
        this.$router.push(this.tabs[index - 1].name);
      } else {
        // 删除中间路由
        this.$router.push(this.tabs[index].name);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    cursor: pointer;
    margin-right: 15px;
  }
}
</style>
