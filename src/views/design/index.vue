<template>
  <div>
    <el-col :span="2">
      <div class="grid-content bg-purple">
          <div style="background-color: #13c2c2;height: 56px;font-size: 2rem;">
            <span style="padding-left: 3rem;">
              <i @click="backToTable()" class="el-icon-back" />
            </span>
          </div>
          <div class="body">
            <ul>
              <div id="marker"></div>
              <li><a @click="goToEdit()" class="a" style="color:#13c2c2;">编 辑</a></li>
              <li><a @click="goToPublish()" class="a">发 布</a></li>
              <li><a @click="goToEdit()" class="a">统 计</a></li>
              <li><a @click="goToEdit()" class="a">数 据</a></li>
              <li><a @click="goToEdit()" class="a">逻 辑</a></li>
            </ul>
          </div>
      </div>
    </el-col>
    <el-col :span="22">
      <div class="grid-content bg-purple-light">
        <k-form-design ref="kfd" title="" @save="saveOrUpdate"  />
      </div>
    </el-col>
  </div>
</template>

<script>
import formApi from '@/api/form/form'
import qrCodeApi from '@/api/qrCode/qrcode'

export default {
  data() {
    return {
      jsonData: {
        "list": [{
			    "type": "text",
			    "label": "请输入您的标题",
			    "icon": "icon-zihao",
			    "options": {
				    "textAlign": "center",
				    "showLabel": true,
				    "hidden": false,
				    "showRequiredMark": false,
				    "noFormItem": true,
				    "color": "rgba(0, 0, 0, 0.9)",
				    "fontFamily": "",
				    "fontSize": "24pt"
			    },
			    "key": "text_1666947059803"
		    },
        {
			  "type": "editor",
			  "label": "富文本",
			  "list": [],
			  "options": {
				  "height": 300,
				  "placeholder": "请输入",
				  "defaultValue": "",
				  "chinesization": true,
				  "hidden": false,
				  "disabled": false,
				  "showLabel": false,
				  "width": "100%"
			  },
			  "model": "description",
			  "key": "editor_1666947747637",
			  "help": "",
			  "rules": [{
					"required": false,
					"message": "必填项"
				}]
		    }],
	      "config": {
		      "layout": "horizontal",
		      "labelCol": {
			    "span": 4
		    },
		    "wrapperCol": {
			    "span": 18
		    },
		"hideRequiredMark": false,
		"customStyle": ""
	}
      },
      formId: '',
      formvo: {}
    }
  },
  created() {
    this.init()
  },
  watch:{  //监听中  监控路由的变化
    $route(to,from){  //当路由发生变化，方法就会执行。
      this.init()
    }
  },
  mounted() {
    this.importData()
    const marker = document.querySelector('#marker')
    const item = document.querySelectorAll('.a')
    function indicator (e) {
      marker.style.top = e.offsetTop + 'px'
      // marker.style.width = e.offsetWidth + 'px'
    }
    item.forEach(link => {
      link.addEventListener('mousemove', e => {
      indicator(e.target)
      })
    })
  },
  methods: {
    saveOrUpdate(values) {
       //判断修改还是添加
       if(this.formId){
        this.update(this.formId,values)
       }else{
        this.saveForm(values)
       } 
    },
    //添加表单
    saveForm(values) {
      this.formvo.title = JSON.parse(values).list[0].label
      this.formvo.values = values
      formApi.addForm(this.formvo).then(res => {
      //提示信息
      this.$message({
        type: 'success',
        message: '添加成功!'
      })
      // 回到list页面 路由跳转 重定向
      // this.$router.push({path:'/teacher/table'})
      })
    },
    update(id, values) {
      this.formvo.title = JSON.parse(values).list[0].label
      this.formvo.values = values
      this.formvo.id = id
      formApi.update(this.formvo).then(res=>{
        //提示信息
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })
    },
    init() {
      if(this.$route.params && this.$route.params.id){
        this.formId = this.$route.params.id
        const id = this.$route.params.id
        this.getInfo(id)
      }       
    },
    getInfo(id) {
      formApi.getFormItemById(id).then(res=>{
        this.jsonData = JSON.parse(res.data.formItem.item)
        // console.log(this.jsonData)
        this.importData()
      })
    },
    importData() {
      this.$refs.kfd.handleSetData(this.jsonData)
    },
    goToEdit() {
      if(this.$route.params && this.$route.params.id){
        this.$router.push({ path:'/edit/', query: { id: this.$route.params.id } })
      }else{
        this.$router.push({ path:'/design' })
      }
    },
    backToTable() {
      this.$router.push({ path:'/forms/list' })
    },
    goToPublish() {
      if(this.$route.params && this.$route.params.id){
        this.$router.push({ path:'/publish/', query: { id: this.$route.params.id } })
      }else{
        const value = this.$refs.kfd.getValue()
        this.formvo.title = value.list[0].label
        this.formvo.values = JSON.stringify(value)
        formApi.addForm(this.formvo).then(res => {
          //提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          console.log(res.data.formItem.formId)
          this.$router.push({ path:'/publish/', query: { id: res.data.formItem.formId } })
        })
      }
    }
  }
}
</script>

<style scoped>
  .el-icon-back:hover{
    color: #fff;
    cursor:pointer;
  }
  .body{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 95vh;
    background: linear-gradient(45deg,#ffffff,#d4f6f63b);
    border-right: #b2cfcf solid 0.1rem;
  }
  .body ul{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .body ul li {
    list-style: none;
  }
  .body ul li a{
    position: relative;
    font-size: 1.5rem;
    color: #051919;
    text-decoration: none;
    padding: 1rem 2rem 5rem 0rem;
    display: inline-block;
  }

  .body ul li a:hover{
    position: relative;
    font-size: 1.5rem;
    color: #13c2c2;
    text-decoration: none;
    padding: 1rem 2rem 5rem 0rem;
    display: inline-block;
  }

  #marker{
    position: absolute;
    right: -14%;
    top: 0;
    height: 3.2rem;
    width: 0.3rem;
    background: #13c2c2;
    transition: 0.5s;
    margin-top: 1.1rem;
  }
</style>
