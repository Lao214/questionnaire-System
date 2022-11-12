<template>
    <div>
      <el-row style="padding-top:20px;padding-bottom: 17px;border-bottom: 1px solid lightseagreen;">
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
              <el-input v-model="formQuery.name" placeholder="请输入问卷名称进行搜索" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" />
              </el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="padding-top:20px">
        <el-col :span="2">
            <div class="grid-content bg-purple">
                <i class="el-icon-more" /><navigationBar :form-id="formId" />
            </div>
        </el-col>
        <el-col :span="22">
      <div style="margin-top: 20px;" />
      <div class="container">
        <el-table :data="list" :header-cell-style="{ 'font-size': '16px', color: '#1192ac' }" :cell-style="{ height: '44px', padding: '0px' }" style="width: 100%" max-height="550" border small>
            <div v-for="(item, key) in list[0]" :key="item.id">
              <el-table-column :label="key" :prop="key" />
            </div>
          </el-table>
      </div>
      <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding:30px 0; text-align:center;" layout="total,prev,pager,next,jumper" @current-change="getList" />
    </el-col>
    </el-row>
   </div>
</template>

<script>
import formDataApi from '@/api/formData/formData'
import navigationBar from '@/components/MyEditor/navigationBar.vue'

export default {
  components: {
    navigationBar
  },
  data() {
    return {
      page: 1,
      limit: 10,
      formQuery: {
        status: '',
        type: '',
        name: ''
      },
      headers: [],
      total: 0,
      list: [],
      formId: ''
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
        this.formQuery.id = this.$route.params.id
        this.formId = this.$route.params.id
    } else if (this.$route.query && this.$route.query.id) {
        this.formQuery.id = this.$route.query.id
        this.formId = this.$route.query.id
    }
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      formDataApi.getFormDataList(this.page, this.limit, this.formQuery).then(res => {
        this.headers = Object.keys(res.data.map[0])
        console.log(this.headers)
        this.list = res.data.map
        this.total = res.data.total
        // console.log(this.list)
        // console.log(this.list[0])
        // console.log(this.list[0].单选框杰克苏)
      }).catch(error => {
        console.log(error)
      })
    },
    resetData() {
      this.formQuery = {}
    }
  }
}
</script>
