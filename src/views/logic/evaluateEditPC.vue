<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark2">
              <i id="return" class="el-icon-d-arrow-left" style="font-size: 1.2rem;padding:0.7rem;" />
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark3">
              <p style="text-align:center;font-weight: 600;padding-top: 1rem;">UI组件</p>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('radioGroup','单选框')">环形分数</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('slider','滑动条')">条形分数</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('imageShow','图片展示','https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg')">图片展示</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('divider')">分割线</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('myInput',)">文字描述</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('myInput',)">表格</el-button>
              <el-divider />
              <p style="text-align:center;font-weight: 600;">布局方式</p>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="layout()">添加栅格</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="layout()">垂直布局</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="layout()">水平布局</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="layout()">十字布局</el-button>
            </div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    
  },
  data() {

  },
  methods: {

  }
}
</script>

<style scoped>
  .bg-purple-dark {
    height: 100vh;
   
  }
  .bg-purple-dark2 {
    height: 5vh;
    border-right: lightseagreen 1px solid;
    border-bottom: lightseagreen 1px solid;
  }
  .bg-purple-dark3 {
    height: 95vh;
    border-right: lightseagreen 1px solid;
  }
  .bg-purple {
    height: 100vh;
  }
  .grid-content {
    min-height: 36px;
  }
  #return:hover{
    color: lightseagreen;
    cursor: pointer;
  }
</style>
