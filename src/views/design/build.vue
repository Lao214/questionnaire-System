<template>
  <div>
    <div style="padding: 1.7rem 2rem 2.2rem 2rem;">
      <k-form-build ref="kfb" :value="jsonData" />
    </div>
    <div style="padding:0px 0px 2rem 0 ;">
    <el-button class="el-button--goon" style="display:block;margin:0 auto;" @click="handleGetData">获取数据</el-button>
    </div>
    <p>&nbsp;</p>
  </div>
</template>

<script>
import formApi from '@/api/form/form'

export default {
    data () {
        return {
          jsonData: {},
          formId: ''
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
        console.log(this.jsonData)
        // 使用getData函数获取数据
        this.$refs.kfb.getData().then(values => {
          console.log('验证通过', values)
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

</style>

