<template>
  <div>
    <el-row>
      <el-col :span="1">
        <div>
          <navigationBar :form-id="formId" />
        </div>
      </el-col>
      <el-col :span="24">
        <div>
          <el-row style="height: 70vh;">
            <el-col :span="6">
              <div style="height: 70vh;border-right: 1px solid lightseagreen;">
                <div class="outer">
                  <div class="inter">
                    <el-row style="padding:11px;display:flex;justify-content:end;line-height:3rem;"><span>标签：</span><el-input v-model="label" style="width: 70%;" disabled /></el-row>
                    <el-row style="padding:11px;display:flex;justify-content:end;line-height:3rem;"><span>数据字段：</span><el-input v-model="modelValue" style="width: 70%;" disabled /></el-row>
                    <el-row style="padding:11px;display:flex;justify-content:end;line-height:3rem;"><span>别名：</span><el-input v-model="nickname" style="width: 70%;" @input="changeNickname(nickname)" @change="changeNickname(nickname)" /></el-row>
                    <el-row style="padding:11px;display:flex;justify-content:center;line-height:3rem;"><el-button @click="addValue()">加入该选项进行计算</el-button></el-row>
                    <!--radio选框的options begin-->
                    <div v-if="component === 'radioGroup'" style="padding:7px">
                      <el-divider />
                      <p style="text-align:center;font-weight: 600;">选项配置(添加逻辑分数)</p>
                      <div v-for="(item,index) in defaultRadioOp" :key="index">
                        <el-row style="padding:4px;display: flex;justify-content: center;line-height: 3rem;">
                          <el-input v-model="item.radioLabel" style="margin-right:1rem" disabled />
                          <el-input v-model="item.radioValue" style="margin-right:1rem" disabled />
                          <el-input v-model="item.score" type="number" @input="changeScore(item.score, index)" />
                        </el-row>
                      </div>
                      <el-divider />
                    </div>
                    <!--radio选框的options end-->
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="height: 70vh;border-right: 1px solid lightseagreen;">
                <div style="width:100%;background-color: #fff;height: 47px;display:flex;justify-content:start;border-bottom: lightseagreen solid 1px;">
                  <span class="toolbar" @click="backToTable()"><i class="el-icon-close" /></span>
                  <span class="toolbar" @click="toevaluateSelect('phone')"><i class="el-icon-mobile-phone" />编辑移动端反馈界面</span>
                  <span class="toolbar" @click="toevaluateSelect('pc')"><i class="el-icon-monitor" />编辑pc端反馈界面</span>
                </div>
                <div style="padding:2rem 0px 2rem 0 ;">
                  <p style="text-align:center;font-weight: 600;color: lightseagreen;font-size: 1.4rem;word-break: break-all;word-wrap: break-word;">{{ formula }}</p>
                  <div v-show="formulaEdit" style="padding: 1rem;">
                    <el-input v-model="formula" @input="formulaChange()"><el-button slot="append" icon="el-icon-check" @click="formulaEdit = false" /></el-input>
                    <p style="color: red;">请不要修改等于号后面的result(保持result+序号的形式)，除非整条运算删除（两个逗号之间）。</p>
                    <p style="color: red;">请不要删除最后一个逗号,也不要使用中文逗号，括号也是用英文的。</p>
                    <p style="color: red;">请使用别名来作为运算成员(点击选中下方题目后，点击左侧边栏中的【加入该选项进行计算】，可将该别名加入到运算公式中)。</p>
                    <p style="color: red;">请不要使用运算符之外的符号（乘号是小写字母x）。</p>
                  </div>
                  <el-button class="el-button--goon" style="display:block;margin:0 auto;" @click="formulaEdit = true">重新编辑逻辑</el-button>
                  <el-button class="el-button--goon" style="display:block;margin:10px auto;" @click="saveAll()">保存所有选项</el-button>
                  <!-- <formula /> -->
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div style="height: 70vh;">
                <el-divider />
                <p style="text-align:center;font-weight: 600;">运算符</p>
                <el-row style="padding:11px;display: block;">
                  <el-button type="primary" circle @click="addOperator(0)">{{ operator[0] }}</el-button>
                  <el-button type="primary" circle @click="addOperator(1)">{{ operator[1] }}</el-button>
                  <el-button type="success" circle @click="addOperator(2)">{{ operator[2] }}</el-button>
                  <el-button type="success" circle @click="addOperator(3)">{{ operator[3] }}</el-button>
                  <el-button type="warning" circle @click="addOperator(4)">{{ operator[4] }}</el-button>
                  <el-button type="danger" circle @click="addOperator(5)">{{ operator[5] }}</el-button>
                  <el-button type="info" circle @click="addOperator(6)">{{ operator[6] }}</el-button>
                </el-row>
                <el-divider />
                <p style="text-align:center;font-weight: 600;">结果集</p>
                <el-row style="padding:11px;display: block;">
                  <el-button v-for="(item, index) in result" :key="index" type="primary" @click="addResult(index)">{{ item }}</el-button>
                </el-row>
                <el-divider />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="height: 30vh;">
              <div class="grid-content bg-purple-dark">
                <div>
                  <el-tag v-for="(item, index) in items" :key="index" effect="dark" type="info" class="tags" color="rgba(185, 202, 202, 0.639)" @click="showOption(item.label, item.modelValue, item.component, item.defaultRadioOp, item.nickname, index)">
                    <span v-if="item.component === 'radioGroup' || item.component === 'slider'">{{ item.label }}</span>
                  </el-tag>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import formApi from '@/api/form/form'
import navigationBar from '@/components/MyEditor/navigationBar.vue'

export default {
  components: {
    navigationBar
  },
  data() {
    return {
      items: [],
      formId: '',
      label: '',
      modelValue: '',
      component: '',
      defaultRadioOp: [],
      nickname: '',
      operator: ['(', ')', '+', '-', 'x', '÷', '='],
      result: [],
      formula: '',
      formvo: {},
      formulaEdit: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query && this.$route.query.id) {
        this.formId = this.$route.query.id
        const id = this.$route.query.id
        this.getInfo(id)
      }
    },
    getInfo(id) {
      formApi.getFormItemById(id).then(res => {
        this.items = JSON.parse(res.data.formItem.item)
        console.log(this.items)
        formApi.getFormById(id).then(res => {
          this.title = res.data.form.name
          this.description = res.data.form.description
          this.formula = res.data.form.evaluateLogic
          var resultArray = this.formula.split(',')
          // console.log(resultArray)
          for (var i = 1; i < resultArray.length; i++) {
            this.result.push('result' + (this.result.length + 1))
          }
        })
      })
    },
    showOption(label, modelValue, component, defaultRadioOp, nickname, index) {
      this.label = label
      this.modelValue = modelValue
      this.component = component
      this.defaultRadioOp = defaultRadioOp
      this.index = index
      if (nickname) {
        this.nickname = nickname
      } else {
        this.nickname = 'q' + (index + 1)
        this.items[this.index].nickname = this.nickname
      }
    },
    changeNickname(nickname) {
      this.items[this.index].nickname = nickname
      // console.log(this.items[this.index])
    },
    changeScore(score, index) {
      this.items[this.index].defaultRadioOp[index].score = score
      // console.log(this.items[this.index])
    },
    addOperator(number) {
      this.formula = this.formula + this.operator[number]
      if (number === 6) {
        this.formula = this.formula + 'result' + (this.result.length + 1) + ','
        this.result.push('result' + (this.result.length + 1))
      }
    },
    addValue() {
      this.formula = this.formula + this.nickname
    },
    addResult(number) {
      this.formula = this.formula + this.result[number]
    },
    saveAll() {
      this.formvo.values = JSON.stringify(this.items)
      this.formvo.id = this.formId
      this.formvo.formula = this.formula
      formApi.updateFormItem(this.formvo).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }
      })
    },
    formulaChange() {
      const array = this.formula.split(',')
      // console.log(array.length)
      this.result = []
      for (var i = 0; i < array.length - 1; i++) {
        this.result.push('result' + (i + 1))
      }
    },
    backToTable() {
      this.$router.push({ path: '/forms/list' })
    },
    toevaluateSelect(type) {
      if (type === 'pc') {
        this.$router.push({ path: '/editEvaluatePC', query: { id: this.formId }})
      } else if (type === 'phone') {
        this.$router.push({ path: '/editEvaluatePhone', query: { id: this.formId }})
      }
    }
  }
}
</script>

<style scoped>
  .tags{
    margin: 17px 27px;
    cursor: pointer;
    color: rgb(9, 48, 46);
  }

  .tags:hover{
    margin: 17px 27px;
    color: lightseagreen;
  }

  .bg-purple-dark {
    border-top: lightseagreen 1px solid;

  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

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

.outer {
    height: 70vh;
    overflow-y: scroll;
}
.inter {
    height: 100vh;
    width: 100%;
}
.toolbar{
    margin:11px 17px 2px 17px;
    font-size: 1rem;
  }
  .toolbar:hover{
    color:lightseagreen;
    cursor: pointer;
  }
</style>
