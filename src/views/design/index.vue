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
              <li><a @click="goToEdit()" class="a" style="color:#13c2c2;"><i class="el-icon-edit"></i> 编 辑</a></li>
              <li><a @click="editHTML()" class="a"><i class="el-icon-edit-outline"></i> 描 述</a></li>
              <li><a @click="goToPublish()" class="a"><i class="el-icon-video-play"></i> 发 布</a></li>
              <li><a @click="goToEdit()" class="a"><i class="el-icon-s-data"></i> 统 计</a></li>
              <li><a @click="goToEdit()" class="a"><i class="el-icon-s-platform"></i> 数 据</a></li>
              <li><a @click="goToEdit()" class="a"><i class="el-icon-s-promotion"></i> 逻 辑</a></li>
            </ul>
          </div>
      </div>
    </el-col>
    <el-col :span="22">
      <div class="grid-content bg-purple-light">
        <k-form-design hideModel showToolbarsText ref="kfd" title="" @save="saveOrUpdate"></k-form-design>
      </div>
    </el-col>

    <el-dialog title="编辑描述" :visible.sync="dialogVisible" width="50%">
      <WEditor :result-text-parent="htmlElement" @callBack="callBack" />
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formApi from '@/api/form/form'
import WEditor from  '@/components/editor/index.vue'
import qrCodeApi from '@/api/qrCode/qrcode'
import { nodeSchema } from 'k-form-design'

export default {
  components: {
    WEditor
  },
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
				    "fontSize": "18pt"
			    },
			    "key": "text_1666947059803"
		    },
        {
          "type": "html",
          "label": "HTML",
          "icon": "icon-ai-code",
          "options": {
            "showLabel": true,
            "noFormItem": true,
            "hidden": false,
            "height": 300,
            "delete": false,
            "defaultValue": "<h2>问卷描述，点击左边👈描述进行修改，请不要移动描述和标题的位置</h2>"
          },
          "key": "html_1667389983198"
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
      formvo: {},
      dialogVisible: false,
      htmlElement: '',
      jsonList: []
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
      this.jsonList =JSON.parse(values)
      for (let index = 0; index < this.jsonList.list.length; index++) {
        if(this.jsonList.list[index].model){
          this.jsonList.list[index].model = this.jsonList.list[index].label
          this.jsonList.list[index].model = this.jsonList.list[index].model.replace('.','_')
        }
      }
      // console.log(this.jsonList)
      this.jsonList =JSON.stringify(this.jsonList)
      // console.log(this.jsonList)
      // 判断修改还是添加
      if(this.formId){
        this.update(this.formId,this.jsonList)
      }else{
        this.saveForm(this.jsonList)
      } 
      // 判断修改还是添加
      // if(this.formId){
      //   this.update(this.formId,values)
      // }else{
      //   this.saveForm(values)
      // } 
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
    },
    editHTML(){
        // console.log(this.jsonData.list[1].options.defaultValue)
        this.dialogVisible = true
        this.htmlElement = this.jsonData.list[1].options.defaultValue
    },
    callBack(show,html) {
        this.dialogVisible = show
        this.jsonData.list[1].options.defaultValue = html
        this.importData()
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
    font-size: 1.2rem;
    color: #051919;
    text-decoration: none;
    padding: 1rem 1rem 4rem 0rem;
    display: inline-block;
  }

  .body ul li a:hover{
    position: relative;
    font-size: 1.2rem;
    color: #13c2c2;
    text-decoration: none;
    padding: 1rem 1rem 4rem 0rem;
    display: inline-block;
  }

  #marker{
    position: absolute;
    right: -7%;
    top: 0;
    height: 2.7rem;
    width: 0.3rem;
    background: #13c2c2;
    transition: 0.5s;
    margin-top: 0.7rem;
  }
</style>
