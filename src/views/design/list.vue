<template>
  <div>
<el-row style="padding-top:20px">
  <el-col :span="5" style="margin-left:70px;">
    <div class="grid-content bg-purple">
        <el-radio-group v-model="formQuery.status">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="1">已发布</el-radio-button>
        <el-radio-button label="0">未发布</el-radio-button>
       </el-radio-group>
    </div>
  </el-col>

  <el-col :span="5">
    <div class="grid-content bg-purple-light">
        <el-radio-group v-model="formQuery.type">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="1">有反馈</el-radio-button>
        <el-radio-button label="0">无反馈</el-radio-button>
      </el-radio-group>
    </div>
  </el-col>

  <el-col :span="7">
    <div class="grid-content bg-purple">
        <div>
        <el-input placeholder="请输入问卷名称进行搜索" v-model="formQuery.name" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        </div>
    </div>
  </el-col>

    <el-col :span="4" style="padding-left:47px">
        <div class="grid-content bg-purple">
          <router-link :to="'/kndex'">
            <el-button type="success">+  创建表单</el-button>
          </router-link>
        </div>
    </el-col>
</el-row>

    <div style="margin-left: 70px;margin-top: 20px;">
    </div>
    <div class="container">
        <div v-for="(item,index) in list" :key="index">
          <router-link :to="'/edit/'+item.id">
            <div class="card">
              <div class="imgBx">
                <img src="../../assets/design.png" alt="">
              </div>
              <div class="contentBx">
                <h2>{{ item.name }}</h2>
                <p>欢迎填写</p>
                <a href="#"><span>Read More</span></a>
              </div>
            </div>
          </router-link>
        </div>
    </div>

    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding:30px 0; text-align:center;" layout="total,prev,pager,next,jumper" @current-change="getList"/>
  </div>
</template>

<script>
 import formApi from '@/api/form/form'

export default {
  data() {
    return {
      page:1,
      limit:10,
      formQuery:{
        status: '',
        type: '',
        name: '',
      },
      total:0,
      list:null
    }
  },
  created() {
    this.getList()
  },
  methods: {
     //不传默认page为1
     getList(page=1) {
      this.page=page
      formApi.getFormList(this.page,this.limit,this.formQuery).then(res=>{
        //请求成功
        console.log(res.data.rows);
        this.list=res.data.rows;
        this.total=res.data.total;
      }).catch(error=>{
        console.log(error);
      })
    },
    resetData() {
      this.formQuery={}
    },
    removeById(id) {
        this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(() => {
          formApi.deleteTeacherById(id).then(res=>{
            this.$message({
            type: 'success',
            message: '删除成功!'
        });
            this.getList()
            })
        })//点击取消，执行catch方法
    }
  }
}
</script>

<style scoped>
 *{
  font-family: '微软雅黑', sans-serif;
  box-sizing: border-box;
}

.container{
  padding-left:50px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
}

.container .card{
  width: 210px;
  height: 254px;
  margin: 20px;
  padding: 20px 20px;
  background: #ebf5fc;
  border-radius: 40px;
  box-shadow: -6px -6px 20px rgba(255, 255, 255, 1),
              6px 6px 20px rgba(0, 0, 0, .1);
}

.container .card:hover{
  box-shadow: inset -6px -6px 10px rgba(255, 255, 255, 0.5),
              inset 6px 6px 20px rgba(0, 0, 0, 0.05);
}

.container .card .imgBx{
  position: relative;
  text-align: center;
}

.container .card .imgBx img{
  max-width: 40px;
}

.container .card .contentBx{
  position: relative;
  margin-top: 20px;
  text-align: center;
}

.container .card .contentBx h2{
  color: #32a3b1;
  font-weight: 700;
  font-size: 1.4em;
  letter-spacing: 2px;
}

.container .card .contentBx p{
  color: #32a3b1;
}

.container .card .contentBx a{
  display: inline-block;
  padding: 10px 20px;
  margin-top: 15px;
  border-radius: 40px;
  color: #32a3b1;
  font-size: 16px;
  text-decoration: none;
  box-shadow: -4px -4px 15px rgba(255, 255, 255, 1),
  4px 4px 15px rgba(0, 0, 0, .1);
}

.container .card .contentBx a:hover{
  box-shadow: inset -4px -4px 10px rgba(255, 255, 255, 0.5),
  inset 4px 4px 10px rgba(0, 0, 0, .1);
}

.container .card .contentBx a:hover span{
  display: block;
  transform: scale(0.98);
}

.container .card:hover .imgBx,
.container .card:hover .contentBx{
  transform: scale(0.98);
}

.el-select .el-input {
    width: 130px;
  }
  .el-select {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
