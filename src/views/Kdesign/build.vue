<template>
  <div>
    <div class="design">
      <h2 style="text-align:center;">{{ title }}</h2>
      <div v-html="description" />
      <component :is="item.component" v-for="(item, index) in items" :key="index" :max="item.max" :min="item.min" :step="item.step" :radio-list="item.defaultRadioOp" :text="item.text" :label="item.label" :option-key="index" :model-value="item.modelValue" :default-value="item.defaultValue" @propDefaultValue="propDefaultValue" />
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
import weditor from '../../components/editor/indextor.vue'
import radioGroup from '../../components/MyBuild/radioGroup.vue'
import slider from '../../components/MyEditor/slider.vue'
import imageShow from '../../components/MyEditor/imageShow.vue'
import divider from '../../components/MyEditor/divider.vue'
import myInput from '../../components/MyEditor/myInput.vue'

export default {
  components: {
    weditor,
    radioGroup,
    slider,
    imageShow,
    divider,
    myInput
  },
  data() {
    return {
      jsonData: {},
      scoreData: {},
      formId: '',
      formvo: {},
      items: [],
      title: '',
      description: ''
    }
  },
  created() {
    this.formId = this.$route.query.id
    this.getInfo(this.formId)
  },
  methods: {
    getInfo(id) {
      formApi.getFormItemById(id).then(res => {
        this.items = JSON.parse(res.data.formItem.item)
        console.log(this.items)
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].component === 'radioGroup' && this.items[i].component === 'slider' && this.items[i].component === 'myInput') {
            this.jsonData[this.items[i].modelValue] = this.items[i].defaultValue
            this.scoreData[this.items[i].modelValue] = this.items[i].nickname
          }
        }
        formApi.getFormById(id).then(res => {
          this.title = res.data.form.name
          this.description = res.data.form.description
          // this.jsonData['title'] = this.title
          // this.jsonData['description'] = this.description
          this.jsonData['formId'] = this.formId
          this.jsonData['createTime'] = this.$formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        })
      })
    },
    handleGetData() {
      this.formvo['data'] = JSON.stringify(this.jsonData)
      this.formvo['id'] = this.formId
      this.formvo['title'] = this.title
      console.log(this.formvo)
      formDataApi.postFormData(this.formvo).then(res => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
      })
    },
    propDefaultValue(modelValue, value) {
      this.jsonData[modelValue] = value
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

