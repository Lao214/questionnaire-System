<template>
  <div>
<el-row style="padding-top:20px">
  <el-col :span="5" style="margin-left:70px;">
    <div class="grid-content bg-purple">
        <el-radio-group v-model="radio1">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="已发布"></el-radio-button>
        <el-radio-button label="未发布"></el-radio-button>
       </el-radio-group>
    </div>
  </el-col>

  <el-col :span="5">
    <div class="grid-content bg-purple-light">
        <el-radio-group v-model="radio2">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="有反馈"></el-radio-button>
        <el-radio-button label="无反馈"></el-radio-button>
      </el-radio-group>
    </div>
  </el-col>

  <el-col :span="7">
    <div class="grid-content bg-purple">
        <div>
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        </div>
    </div>
  </el-col>

    <el-col :span="4" style="padding-left:47px">
        <div class="grid-content bg-purple">
            <el-button type="success">+  创建表单</el-button>
        </div>
    </el-col>
</el-row>

    <div style="margin-left: 70px;margin-top: 20px;">
    </div>
    <div class="container">
        <div v-for="(item,index) in formList" :key="index">
            <div class="card">
                <div class="imgBx">
                    <img src="../../assets/design.png" alt="">
                </div>
                <div class="contentBx">
                    <h2>{{ item.title }}</h2>
                    <p>{{ item.description }}</p>
                    <a href="#"><span>Read More</span></a>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formList: [
        {
          'title': '恒毅力',
          'description': '任何时候，无论你面临着生命的何等困惑'
        },
        {
          'title': '逆商',
          'description': '任何时候，无论你面临着生命的何等困惑'
        },
        {
          'title': '同理心',
          'description': '任何时候，无论你面临着生命的何等困惑'
        },
        {
          'title': '组织文化',
          'description': '任何时候，无论你面临着生命的何等困惑'
        },
        {
          'title': '情绪商数',
          'description': '任何时候，无论你面临着生命的何等困惑'
        },
        {
          'title': '自我同理心',
          'description': '任何时候，无论你面临着生命的何等困惑'
        },
        {
          'title': '别搞乱七八糟的',
          'description': '任何时候，无论你面临着生命的何等困惑'
        },
        {
          'title': '测试',
          'description': '任何时候，无论你面临着生命的何等困惑'
        }
      ],
      radio1: '全部',
      radio2: '全部',
      input1: '',
      input2: '',
      input3: '',
      select: ''
    }
  },
  mounted() {
  },
  methods: {
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
