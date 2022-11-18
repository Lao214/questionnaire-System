<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="statisticsHead">
          <el-button class="el-button--goon">本日</el-button>
          <el-button class="el-button--goon">本周</el-button>
          <el-button class="el-button--goon">本月</el-button>
          <el-button class="el-button--goon">本季度</el-button>
          <el-button class="el-button--goon">今年</el-button>
          <el-button class="el-button--goon">全部</el-button>
          <el-date-picker v-model="value1" type="datetimerange" style="margin-left: 41px;" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="statistics">
          <el-card class="box-card">
            回收量：<br>
            <span class="card-value">1232</span>
          </el-card>
          <el-card class="box-card">
            访问量：<br>
            <span class="card-value">1232</span>
          </el-card>
          <el-card class="box-card">
            回收率：<br>
            <span class="card-value">49%</span>
          </el-card>
          <el-card class="box-card">
            平均完成时间：<br>
            <span class="card-value">09:20</span>
          </el-card>
          <el-card class="box-card">
            回收量排名：<br>
            <span class="card-value">No.12</span>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="statisticsBody">
          <el-card class="echarts-card">
            <div id="collectThisWeek" style="height: 450px;" />
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="statisticsBody">
          <el-card class="echarts-card">

          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="statisticsBody">
          <el-card class="echarts-card">
            
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
    }
  },
  mounted() {
    this.getEchartData()
  },
  methods: {
    getEchartData() {
      var chartDom = document.getElementById('collectThisWeek')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '日收集量'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          axisLine: { // y轴线条颜色
            show: true,
            lineStyle: {
              color: 'rgb(59, 59, 59)'
            }
          }
        },
        series: [
          {
            data: [1790, 222, 2701, 934, 390, 1220, 120],
            type: 'line',
            // showSymbol: false,
            // 去除面积图节点圆
            areaStyle: { // 区域填充渐变颜色
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'lightseagreen' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgb(32, 178, 107)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            smooth: true,
            lineStyle: {
              width: 2, // 外边线宽度
              color: 'rgb(51, 178, 32)' // 外边线颜色
            }
          }
        ]
      }
      option && myChart.setOption(option)
    }
  }
}
</script>

<style>
.statisticsHead{
  padding: 27px;
  height: 11vh;
  border-bottom: lightseagreen solid 1px;
  color: rgb(59, 59, 59);
}
.box-card {
    width: 270px;
    height: 110px;
    margin-left: 11px;
    margin-right: 21px;
}
.statistics{
  display: flex;
  justify-content: center;
  padding: 19px;
}
.card-value{
  padding-left: 4rem;
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: lightseagreen;
  line-height: 3rem;
}
.echarts-card{
  height: 500px;
  margin: 11px;
}

/* 按钮风格重定义 */
.el-button--goon {
  color: lightseagreen;
  background-color: rgb(255, 255, 255);
  border-color: lightseagreen;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:focus,
.el-button--goon:hover {
  color: rgb(245, 245, 245);
  background-color: lightseagreen;
  border-color: lightseagreen;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:active {
  color: #ffffff;
  background-color: #084141;
  border-color: #084141;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
/* 按钮风格重定义 */
</style>
