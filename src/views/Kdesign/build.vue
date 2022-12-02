<template>
  <div>
    <div class="design">
      <h1 id="inActiveTime" style="display: none;position:absolute;bottom: 50%;left: 20%; color:#999;">{{ inActiveTime }}</h1>
      <h2 style="text-align:center;">{{ title }}</h2>
      <div v-html="description" />
      <component :is="item.component" v-for="(item, index) in items" :key="index" :max="item.max" :min="item.min" :step="item.step" :radio-list="item.defaultRadioOp" :nickname="item.nickname" :label="item.label" :option-key="index" :model-value="item.modelValue" :default-value="item.defaultValue" @propDefaultValue="propDefaultValue" />
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
import believeApi from '@/api/believe/believe'
import weditor from '../../components/editor/indextor.vue'
import radioGroup from '../../components/MyBuild/radioGroup.vue'
import slider from '../../components/MyEditor/slider.vue'
import imageShow from '../../components/MyEditor/imageShow.vue'
import divider from '../../components/MyEditor/divider.vue'
import myInput from '../../components/MyEditor/myInput.vue'

const uaParser = require('ua-parser-js')
const ua = uaParser(navigator.userAgent)

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
      description: '',
      submitID: '',
      countvo: {},
      submitAddress: '',
      jobNo: '',
      realName: '',
      appId: 'GSZDIv6rmA8d2LujhLa30g2',
      code: '',
      inActiveTime: 0,
      clearTimeSet: null
    }
  },
  created() {
    this.jsonData.source = '其他'
    /* 富宝数据begin */
    this.jobNo = this.$store.getters['index/username']
    if (this.$store.getters['index/username']) {
      this.jsonData.source = '富学宝典'
      this.jsonData.realname = this.$store.getters['index/realname']
      this.jsonData.jobNo = this.$store.getters['index/username']
      // this.viewCount()
    }
    /* 富宝数据end */
    /* 相信数据begin */
    this.code = this.$route.query.code
    if (this.code) {
      this.getUserInfoByBelieve()
    }
    /* 相信数据end */
    /* 其他 begin*/
    // if (!this.$store.getters['index/username'] && !this.code) {
    //   this.viewCount()
    // }
    /* 其他 end*/
    this.formId = this.$route.query.id
    this.getInfo(this.formId)
    // this.getTitle(this.formId)
  },
  mounted() {
    this.setTime() // 页面加载完成后开始计时
  },
  beforeDestroy() {
    clearInterval(this.clearTimeSet)
  },
  methods: {
    setTime() {
      // 设置定时器
      this.clearTimeSet = setInterval(() => {
        this.inActiveTime++
      }, 1000)
    },
    getInfo(id) {
      formApi.getFormItemById(id).then(res => {
        this.items = JSON.parse(res.data.formItem.item)
        this.title = res.data.formItem.name
        this.description = res.data.formItem.description
        this.jsonData['formId'] = id
        this.jsonData['createTime'] = this.$formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        console.log(this.items)
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].component === 'radioGroup' && this.items[i].component === 'slider' && this.items[i].component === 'myInput') {
            this.jsonData[this.items[i].modelValue] = this.items[i].defaultValue
          }
        }
      })
    },
    // getTitle(id) {
    //   formApi.getFormById(id).then(res => {
    //     this.title = res.data.form.name
    //     this.description = res.data.form.description
    //     this.jsonData['formId'] = id
    //     this.jsonData['createTime'] = this.$formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
    //   })
    // },
    handleGetData() {
      this.jsonData['submitOs'] = ua.os.name
      this.jsonData['completeTime'] = this.inActiveTime
      this.formvo['data'] = JSON.stringify(this.jsonData)
      this.formvo['scoreJSON'] = JSON.stringify(this.scoreData)
      this.formvo['id'] = this.formId
      this.formvo['title'] = this.title
      // console.log(this.formvo)
      formDataApi.postFormData(this.formvo).then(res => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
        if (res.code === 200 && window.innerWidth > 840) {
          console.log(res.data.resultStr)
          this.$router.push({ path: '/evaluatePC', query: { id: this.formId, result: JSON.stringify(res.data.resultStr) }})
        } else if (res.code === 200 && window.innerWidth <= 840) {
          this.$router.push({ path: '/evaluatePhone', query: { id: this.formId, result: JSON.stringify(res.data.resultStr) }})
        }
      })
    },
    propDefaultValue(modelValue, value, score, nickname) {
      this.jsonData[modelValue] = value
      this.scoreData[nickname] = score
    },
    getUserInfoByBelieve() {
      believeApi.getUserInfoByBelieve('code=' + this.code + '&appid=' + this.appId).then(res => {
        // if (res.exception_code === '504') {
        //   this.$message({ message: res.msg, type: 'error' })
        //   // 相信的 本地测试oauth地址
        //   // http://civetinterface.foxconn.com/Open/oauth/?appid=GSZDIv6rmA8d2LujhLa30g2&redirect_uri=http%3a%2f%2f43.139.110.41%3a81%2f%23%2fbuild%3fid%3d1591227933773537281&scope=snsapi_userinfo
        //   // 域名的 oauth地址
        //   // window.location.href = 'http://civetinterface.foxconn.com/Open/oauth/?to_code=' + this.formId
        //   window.location.href ='http://civetinterface.foxconn.com/Open/oauth/?appid=GSZDIv6rmA8d2LujhLa30g2&redirect_uri=http%3a%2f%2f43.139.110.41%3a81%2f%23%2fbuild%3fid%3d' + this.formId + '&scope=snsapi_userinfo'
        // }
        console.log(res)
        this.jobNo = res.civetno
        this.jsonData.area = res.area
        this.jsonData.bg = res.bg
        this.jsonData.bu = res.bu
        this.jsonData.grade = res.grade
        this.jsonData.gradeDepart = res.grade_depart
        this.jsonData.hrtype = res.hrtype
        this.jsonData.jobNo = res.civetno
        this.jsonData.serviceno = res.serviceno
        this.jsonData.sex = res.sex
        this.jsonData.sign = res.sign
        this.jsonData.unit = res.unit
        this.jsonData.realname = res.realname
        this.jsonData.source = '相信'
        // this.viewCount()
      })
    },
    viewCount() {
      this.countvo.ua = ua.ua
      this.countvo.id = this.$route.query.id
      this.countvo.jobNo = this.jobNo
      formApi.viewCount(this.countvo).then(res => {
        this.submitAddress = res.data.submitAddress
        this.submitID = res.data.submitID
        this.jsonData['createBy'] = es.data.submitID
        this.jsonData['submitAddress'] = res.data.submitAddress
        console.log(this.submitID)
        console.log('thisview，工号' + this.jobNo)
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

