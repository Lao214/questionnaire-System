<template>
  <div>
    <div class="design">
      <k-form-build ref="kfb" :value="jsonData" />
    </div>
    <div style="padding:0px 0px 2rem 0 ;">
    <el-button class="el-button--goon" style="display:block;margin:0 auto;" @click="handleGetData">提 交</el-button>
    </div>
    <p>&nbsp;</p>
  </div>
</template>

<script>
import formApi from '@/api/form/form'
import formDataApi from '@/api/formData/formData'

export default {
    data () {
        return {
          jsonData: {},
          formId: '',
          formvo: {}
      }
    },
    created() {
      this.formId = this.$route.query.id
      this.getInfo(this.formId)
    },
    methods: {
      getInfo(id) {
        formApi.getFormItemById(id).then(res=>{
          this.jsonData = JSON.parse(res.data.formItem.item)
        })
      },
      handleGetData() {
        // console.log(this.jsonData)
        // 使用getData函数获取数据
        this.$refs.kfb.getData().then(data => {
          data["formId"]  = this.formId
          data["createTime"]  = this.$formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
          data["formName"]  = this.jsonData.list[0].label
          console.log(data)
          this.formvo.data = JSON.stringify(data)
          this.formvo.id = this.formId
          this.formvo.title = this.jsonData.list[0].label
          console.log(this.formvo)
          formDataApi.postFormData(this.formvo).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
          })
        }).catch(() => {
          console.log('验证未通过，获取失败')
        })
      }  
    }
}
</script>

<style scoped>

/* 按钮风格重定义 */
.el-button--goon {
  color: #ffffff;
  background-color: #13c2c2;
  border-color: #13c2c2;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:focus,
.el-button--goon:hover {
  color: rgb(245, 245, 245);
  background-color: #0e9a9a;
  border-color: #0e9a9a;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:active {
  color:  #ffffff;
  background-color: #13c2c2;
  border-color: #13c2c2;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
/* 按钮风格重定义 */

@media screen and (max-width: 750px) {
  .design {
    padding: 1.7rem 2rem 2.2rem 2rem;
  }
}

@media screen and (min-width: 751px) and (max-width: 960px) {
  .design {
    padding: 1.7rem 7rem 2.2rem 7rem;
  }
}

@media screen and (min-width: 961px) and (max-width: 1280px){
  .design {
    padding: 1.7rem 14rem 2.2rem 14rem;
  }
}

@media screen and (min-width: 1281px) and (max-width: 1520px){
  .design {
    padding: 1.7rem 21rem 2.2rem 21rem;
  }
}

@media screen and (min-width: 1581px){
  .design {
    padding: 1.7rem 31rem 2.2rem 31rem;
  }
}

</style>

