<template>
  <div class="bodey">
    <p style="font-size:1rem;color:lightseagreen;position: absolute;left: 1.4%;top: 45%;">更<br>多</p>
    <div class="container">
      <!-- --t是自定义属性，通过var函数可调用 -->
      <el-tooltip class="item" effect="dark" content="编辑" placement="right">
        <li style="--t:20%;"><a href="#"><i class="el-icon-edit" aria-hidden="true" /></a></li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="发布" placement="right">
        <li style="--t:30%;"><a href="#"><i class="el-icon-video-play" aria-hidden="true" /></a></li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="数据" placement="right">
        <li style="--t:40%;"><a href="#"><i class="el-icon-s-platform" aria-hidden="true" /></a></li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="统计" placement="right">
        <li style="--t:50%;"><a href="#"><i class="el-icon-s-data" aria-hidden="true" /></a></li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="逻辑" placement="right">
        <li style="--t:60%;"><a href="#"><i class="el-icon-s-promotion" aria-hidden="true" /></a></li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="退出" placement="right">
       <li style="--t:70%;"><a href="#"><i class="el-icon-d-arrow-left" aria-hidden="true" /></a></li>
      </el-tooltip>
      <div class="top"></div>
      <div class="middle"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>


<style scoped>
*{
 /* 初始化 */
 margin: 0;
 padding: 0;
}
body{
    /* 100%窗口高度 */
    height: 100vh;
    background-color: #333;
}
.container{
    width: 25px;
    height: 700px;
    /* 绝对固定定位 */
    position: fixed;
    left: 0;
    /* 垂直居中 */
    top: 50%;
    transform: translateY(-50%);
    background-color:rgb(68, 67, 67);
    /* 右上右下圆角 */
    border-radius: 0 15px 15px 0;
    overflow: hidden;
    /* 动画过渡 */
    transition: 0.3s;
}
.container:hover{
    /* 鼠标移入，展开+改变圆角大小 */
    width: 130px;
    border-radius: 0 30px 30px 0;
}
.container:hover li a{
    /* 鼠标移入，改变字体颜色 */
    color: #fff;
}
.container::before{
    content: "";
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: lightseagreen;
}
.container .top{
    width: calc(100% - 30px);
    margin-left: 30px;
    height: 20%;
    background-color: rgb(68, 67, 67);
    border-radius: 0 0 0 20px;
    /* 动画过渡 */
    transition: 0.2s;
}
.container .middle{
    width: calc(100% - 60px);
    height: 10%;
    background-color: lightseagreen;
    margin-left: 40px;
    border-radius: 20px;
}
.container .bottom{
    width: calc(100% - 30px);
    height: 100%;
    margin-left: 30px;
    background-color: rgb(68, 67, 67);
    border-radius: 20px 0 0 0;
}
.container li{
    /* 绝对定位 */
    position: absolute;
    /* 通过var函数调用自定义属性--t */
    top: var(--t);
    width: 100%;
    height: 10%;
    font-size: 30px;
    /* 弹性布局 水平垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
}
.container li a{
    /* 字体颜色透明 */
    color: transparent;
    /* 动画过渡 */
    transition: 0.3s;
}
/* 分别为每一个li元素设置.top的高度 */
/* ~是兄弟选择器 */
.container li:nth-child(1):hover ~ .top{
    height: 20%;
}
.container li:nth-child(2):hover ~ .top{
    height: 30%;
}
.container li:nth-child(3):hover ~ .top{
    height: 40%;
}
.container li:nth-child(4):hover ~ .top{
    height: 50%;
}
.container li:nth-child(5):hover ~ .top{
    height: 60%;
}
.container li:nth-child(6):hover ~ .top{
    height: 70%;
}
</style>