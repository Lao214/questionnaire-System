<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <div style="border-bottom: 1px solid lightseagreen;height: 56px;font-size: 2rem;">
          <span style="padding-left: 3rem;">
            <i class="el-icon-back" @click="backToTable()" />
          </span>
        </div>
      </div>
    </el-col>
    <el-col :span="1">
      <div class="grid-content bg-purple-dark">
        <div class="body">
          <navigationBar :form-id="formId" />
        </div>
      </div>
    </el-col>
    <el-col :span="22">
      <div class="grid-content bg-purple-dark">
        <div v-if="formStatus === 0">
          <el-button class="el-button--goon" style="width: 140px;height:37px;position: absolute;top: 50%;right: 45%;font-weight: 600;" @click="publish()">发布</el-button>
        </div>
        <div v-if="formStatus === 1">
          <div class="demo-image" style="height:37px;position: absolute;top: 40%;right: 60%;">
            <el-image style="width: 200px;height: 200px" :src="url" />
          </div>
          <!-- <p style="height:37px;position: absolute;top: 60%;right: 35%;">{{ address }}</p> -->
          <p style="height:37px;position: absolute;top: 55%;right: 35%;">{{ address }}</p>
          <el-button class="el-button--goon" style="width: 140px;height:37px;position: absolute;top: 50%;right: 42%;font-weight: 600;" @click="publish()">停止发布</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import formApi from '@/api/form/form'
import navigationBar from '../../components/MyEditor/navigationBar.vue'

export default {
  components: {
    navigationBar
  },
  data() {
    return {
      address: '',
      fits: ['cover'],
      url: 'http://localhost:9700/webApi/form/qrCode/',
      formStatus: 0,
      formId: ''
    }
  },
  created() {
    this.formId = this.$route.query.id
    this.getStatus()
  },
  methods: {
    backToTable() {
      this.$router.push({ path: '/forms/list' })
    },
    goToEdit() {
      if (this.$route.query && this.$route.query.id) {
        this.$router.push({ path: '/edit/' + this.$route.query.id })
      } else {
        this.$router.push({ path: '/design' })
      }
    },
    publish() {
      formApi.publish(this.$route.query.id).then(res => {
        if (res.data.status === 1) {
          this.address = 'http://localhost:9528/#/build?id=' + this.$route.query.id
          this.formStatus = res.data.status
        }
      })
    },
    getStatus() {
      formApi.getFormById(this.$route.query.id).then(res => {
        if (res.data.form.status === 1) {
          this.address = 'http://localhost:9528/#/build?id=' + this.$route.query.id
          this.url = this.url + this.$route.query.id
          this.formStatus = res.data.form.status
        }
      })
    }
  }
}
</script>

<style scoped>
.el-icon-back:hover{
    color: lightseagreen;
    cursor:pointer;
  }
  .body{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 95vh;
  }
z
  /* 按钮风格重定义 */
 .el-button--goon {
  color: #949494;
  background-color: #e9ffff;
  border-color: lightseagreen;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:focus,
.el-button--goon:hover {
  color: rgb(245, 245, 245);
  background-color: lightseagreen;
  border-color: lightseagreen;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
.el-button--goon:active {
  color:  lightseagreen;
  background-color: lightseagreen;
  border-color: lightseagreen;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
}
/* 按钮风格重定义 */

</style>
