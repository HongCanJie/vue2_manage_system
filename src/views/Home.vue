<template>
  <el-row>
    <el-col :span="8" style="padding-right: 0.625rem">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录的时间：<span>2023-12-1</span></p>
          <p>上次登录的地点：<span>广州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 1.25rem">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(key, val) in tableLabel"
            :key="key"
            :label="key"
            :prop="val"
          />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 0.625rem">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ backgroundColor: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 17.5rem">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 16.25rem">
          <div ref="echarts2" style="height: 260px">
            <!-- 柱状图 -->
          </div>
        </el-card>
        <el-card style="height: 16.25rem">
          <!-- 饼状图 -->
          <div ref="echarts3" style="height: 260px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api/index";
// 引入echarts文件
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      tableLabel: {
        name: "品牌名",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
    };
  },
  mounted() {
    // 以promise形式获得请求对象的结果  then()是promise中的一个方法
    getData()
      .then(({ data }) => {
        const { tableData } = data.data;
        this.tableData = tableData;
        // console.log(data);

        // 折线图部分
        // 基于准备好的dom，初始化echarts实例
        var echarts1 = echarts.init(this.$refs.echarts1);
        // 指定图表的配置项和数据
        var echarts1Options = {};
        // 处理xAxis数据
        const { orderData } = data.data;
        const xAxis = Object.keys(orderData.data[0]);
        const xAxisData = { data: xAxis };
        // console.log(xAxis);
        echarts1Options.xAxis = xAxisData;
        echarts1Options.yAxis = {};
        // 处理legend数据
        echarts1Options.legend = xAxisData;
        // 处理series数据
        echarts1Options.series = [];
        xAxis.forEach((key) => {
          echarts1Options.series.push({
            name: key,
            data: orderData.data.map((item) => item[key]),
            type: "line",
          });
        });
        echarts1.setOption(echarts1Options);

        // 柱状图部分
        const { userData } = data.data;
        // 基于准备好的dom，初始化echarts实例
        const echarts2 = echarts.init(this.$refs.echarts2);
        // 指定图表的配置项和数据
        const echarts2Options = {
          // 图例
          legend: {
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          tooltip: {
            trigger: "axis",
          },
          // X轴
          xAxis: {
            type: "category", // 类目轴
            data: userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          // Y轴
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              type: "bar", //表格类型
              name: "新增用户", //数据类目
              data: userData.map((item) => item.new), //数据内容
            },
            {
              name: "活跃用户",
              data: userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        // 设置配置
        echarts2.setOption(echarts2Options);

        // 饼状图部分
        const { videoData } = data.data;
        const echarts3 = echarts.init(this.$refs.echarts3);
        const echarts3Options = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: videoData,
              type: "pie",
            },
          ],
        };
        // 设置配置
        echarts3.setOption(echarts3Options);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang='less' scoped>
.user {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 0.0625rem solid #ccc;
  img {
    width: 9.375rem;
    height: 9.375rem;
    border-radius: 50%;
    margin-right: 2.5rem;
  }
  .userinfo {
    .name {
      font-size: 2rem;
      margin-bottom: 0.625rem;
    }
    .access {
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 1.75rem;
    font-size: 0.875rem;
    color: #999;
  }
  span {
    color: #666;
    margin-left: 3.75rem;
  }
}
.num {
  display: flex;
  // 强制换行
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 5rem;
    height: 5rem;
    font-size: 1.875rem;
    text-align: center;
    line-height: 5rem;
    color: #fff;
  }
  .detail {
    display: flex;
    flex-direction: column;
    margin-left: 0.9375rem;
    .price {
      font-size: 1.875rem;
      margin: 0.625rem 0rem;
      line-height: 1.875rem;
      height: 1.875rem;
    }
    .desc {
      font-size: 0.875rem;
      text-align: center;
      color: #999;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 1.25rem;
  }
}
.graph {
  margin-top: 1.25rem;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>