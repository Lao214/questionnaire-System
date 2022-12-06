<template>
  <div>
    <el-row>
      <el-col :span="1">
        <navigationBar :form-id="formId" @goToPublish="goToPublish" @goToData="goToData" @goToLogic="goToLogic" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-darkTwo">
          <div style="padding:7px 2px 9px 5rem">
            <el-button style="margin:7px;padding: 11px;" @click="addRadio('radioGroup','单选框', '', false, JSON.parse(JSON.stringify(defaultRadioOp)))">单选框组</el-button>
            <el-button style="margin:7px;padding: 11px;" @click="addSlider('slider','滑动条',50,false,100,0,1)">滑动输入</el-button>
            <el-button style="margin:7px;padding: 11px;" @click="add('imageShow','图片展示','https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',false)">图片展示</el-button>
            <el-button style="margin:7px;padding: 11px;" @click="add('divider','','',false)">el分割线</el-button>
            <el-button style="margin:7px;padding: 11px;" @click="add('myInput','输入框','',false)">el输入框</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-darks">
          <div style="width:100%;background-color: #fff;height: 47px;display:flex;justify-content:start;border-bottom: lightseagreen solid 1px;">
            <span class="toolbar" @click="backToTable()"><i class="el-icon-close" /></span>
            <span class="toolbar" @click="saveOrUpdate"><i class="el-icon-document-checked" />保存</span>
          </div>
          <div class="outer">
            <div class="inter">
              <el-row style="padding:11px">
                <div class="zujian" @click="show = false">
                  <h2 v-show="show" style="text-align:center;">{{ title }}</h2>
                </div>
                <el-input v-show="!show" v-model="title"><el-button slot="append" icon="el-icon-check" @click="show = true" /></el-input>
              </el-row>
              <el-row style="padding:11px" class="editor">
                <weditor :result-text-parent="description" @wangEditorChange="wangEditorChange" />
              </el-row>
              <draggable v-model="items" chosen-class="chosen" force-fallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
                <transition-group>
                  <component :is="item.component" v-for="(item, index) in items" :key="index" :max="item.max" :min="item.min" :step="item.step" :radio-list="item.defaultRadioOp" :text="item.text" :label="item.label" :option-key="index" :default-value="item.defaultValue" @callBack="callBack" @propDefaultValue="propDefaultValue" @delCallBack="delCallBack" />
                </transition-group>
              </draggable>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-darkThree">
          <el-row style="padding:11px;display:flex;justify-content:end;line-height:3rem;"><span>选项key：</span><el-button style="width: 70%;">{{ optionIndex }}</el-button></el-row>
          <el-row style="padding:11px;display:flex;justify-content:end;line-height:3rem;"><span>标签：</span><el-input v-model="label" style="width: 70%;" @input="changeTitle(label)" /></el-row>
          <el-row style="padding:11px;display:flex;justify-content:end;line-height:3rem;"><span>数据字段：</span><el-input v-model="modelValue" style="width: 70%;" @input="changeModelValue(modelValue)" /></el-row>
          <el-row style="padding:11px;display:flex;justify-content:end;line-height:3rem;"><span>默认值：</span><el-input v-model="defaultValue" style="width: 70%;" @input="changeDefaultValue(defaultValue)" /></el-row>
          <el-row style="padding:11px;display:flex;justify-content:center;line-height:3rem;"><el-radio-button v-model="requireOption" label="必填" /></el-row>
          <!--radio选框的options begin-->
          <div v-if="thisRadioList.length>0" style="padding:7px">
            <el-divider />
            <p style="text-align:center;font-weight: 600;">选项配置</p>
            <div v-for="(item,index) in thisRadioList" :key="index">
              <el-row style="padding:4px;display: flex;justify-content: center;line-height: 3rem;">
                <el-input v-model="item.radioLabel" style="margin-right:1rem" @input="changeLabelInput(item.radioLabel, index)" />
                <el-input v-model="item.radioValue" @input="changeValueInput(item.radioValue, index)" />
              </el-row>
            </div>
            <el-button size="mini" style="display:block;margin:0 auto;" @click="addRadioList">
              <i class="el-icon-plus" />
            </el-button>
            <el-divider />
          </div>
          <!--radio选框的options end-->
          <!--slider选框的options begin-->
          <div v-show="thisSliderList === 1" style="padding:7px">
            <el-divider />
            <el-row style="padding:4px;display: flex;justify-content: center;line-height: 3rem;">
              <span>最大值：</span><el-input-number v-model="sliderMax" :min="0" :max="100" label="最大值" @change="handleChangeSliderMax" />
            </el-row>
            <el-row style="padding:4px;display: flex;justify-content: center;line-height: 3rem;">
              <span>最小值：</span><el-input-number v-model="sliderMin" :min="0" :max="100" label="最小值" @change="handleChangeSliderMin" />
            </el-row>
            <el-row style="padding:4px;display: flex;justify-content: center;line-height: 3rem;">
              <span>步长值：</span><el-input-number v-model="sliderStep" :min="0" :max="100" label="步长" @change="handleChangeSliderStep" />
            </el-row>
          </div>
          <!--slider选框的options end-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import weditor from '../../components/editor/indextor.vue'
import radioGroup from '../../components/MyEditor/radioGroup.vue'
import slider from '../../components/MyEditor/slider.vue'
import imageShow from '../../components/MyEditor/imageShow.vue'
import divider from '../../components/MyEditor/divider.vue'
import formApi from '@/api/form/form'
import myInput from '../../components/MyEditor/myInput.vue'
import navigationBar from '../../components/MyEditor/navigationBar.vue'
import draggable from 'vuedraggable'

export default {
  components: {
    weditor,
    radioGroup,
    slider,
    imageShow,
    divider,
    myInput,
    navigationBar,
    draggable
  },
  data() {
    return {
      show: true,
      title: '请输入你的标题',
      description: '请输入你的描述',
      value: 0,
      count: 0,
      items: [],
      options: [],
      defaultRadioOp: [{ 'radioLabel': '选项1', 'radioValue': '1', 'score': 0 }, { 'radioLabel': '选项2', 'radioValue': '2', 'score': 0 }],
      requireOption: 0,
      defaultValue: '',
      label: '',
      modelValue: '',
      optionIndex: 0,
      thisRadioList: [],
      thisSliderList: 0,
      sliderMax: 100,
      sliderMin: 0,
      sliderStep: 1,
      formId: '',
      formvo: {},
      jsonList: {},
      drag: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    addRadio(name, label, defaultValue, require, defaultRadioOp) {
      var date = new Date().getTime()
      // console.log(date)
      this.items.push({
        component: name,
        label: label,
        defaultValue: defaultValue,
        modelValue: date,
        require: require,
        defaultRadioOp: defaultRadioOp,
        nickname: 'q0',
        checkScore: ''
      })
    },
    add(name, label, defaultValue, require) {
      var date = new Date().getTime()
      // console.log(date)
      this.items.push({
        component: name,
        label: label,
        defaultValue: defaultValue,
        modelValue: date,
        require: require
      })
    },
    addSlider(name, label, defaultValue, require, max, min, step) {
      var date = new Date().getTime()
      // console.log(date)
      this.items.push({
        component: name,
        label: label,
        defaultValue: defaultValue,
        modelValue: date,
        require: require,
        max: max,
        min: min,
        step: step,
        nickname: '',
        checkScore: ''
      })
    },
    callBack(component, key) {
      this.label = this.items[key].label
      this.optionIndex = key
      this.modelValue = this.items[key].modelValue
      this.defaultValue = this.items[key].defaultValue
      if (component === 'radioGroup') {
        this.thisRadioList = JSON.parse(JSON.stringify(this.items[this.optionIndex].defaultRadioOp))
        this.thisSliderList = 0
      } else if (component === 'slider') {
        this.thisRadioList = []
        this.thisSliderList = 1
        this.sliderMax = this.items[this.optionIndex].max
        this.sliderMin = this.items[this.optionIndex].min
        this.sliderStep = this.items[this.optionIndex].step
      } else if (component === 'imageShow') {
        this.thisRadioList = []
        this.thisSliderList = 0
      } else if (component === 'divider') {
        this.thisRadioList = []
        this.thisSliderList = 0
      } else if (component === 'myInput') {
        this.thisRadioList = []
        this.thisSliderList = 0
      }
    },
    delCallBack(component, key) {
      // console.log(key)
      this.items.splice(key, 1)
    },
    propDefaultValue(component, key, defaultValue) {
      this.label = this.items[key].label
      this.optionIndex = key
      this.modelValue = this.items[key].modelValue
      if (component === 'slider') {
        this.defaultValue = defaultValue
        this.items[this.optionIndex].defaultValue = parseInt(defaultValue)
      } else {
        this.defaultValue = defaultValue
        this.items[this.optionIndex].defaultValue = defaultValue
      }
    },
    addRadioList() {
      this.thisRadioList.push({ 'radioLabel': '选项' + (this.thisRadioList.length + 1), 'radioValue': this.thisRadioList.length + 1 + '', 'score': 0 })
      this.items[this.optionIndex].defaultRadioOp.push({ 'radioLabel': '选项' + (this.thisRadioList.length), 'radioValue': this.thisRadioList.length + '', 'score': 0 })
    },
    changeLabelInput(value, index) {
      this.items[this.optionIndex].defaultRadioOp[index].radioLabel = value
    },
    changeValueInput(value, index) {
      this.items[this.optionIndex].defaultRadioOp[index].radioValue = value
    },
    changeTitle(value) {
      this.items[this.optionIndex].label = value
    },
    changeDefaultValue(value) {
      if (this.items[this.optionIndex].component === 'slider') {
        this.items[this.optionIndex].defaultValue = parseInt(value)
      } else {
        this.items[this.optionIndex].defaultValue = value
      }
    },
    changeModelValue(value) {
      this.items[this.optionIndex].modelValue = value
    },
    wangEditorChange(editorHtml) {
      this.description = editorHtml
    },
    handleChangeSliderMax(value) {
      this.items[this.optionIndex].max = value
    },
    handleChangeSliderMin(value) {
      this.items[this.optionIndex].min = value
    },
    handleChangeSliderStep(value) {
      this.items[this.optionIndex].step = value
    },
    backToTable() {
      this.$router.push({ path: '/forms/list' })
    },
    saveOrUpdate() {
      this.jsonList = JSON.stringify(this.items)
      if (this.formId) {
        this.update(this.formId, this.jsonList)
      } else {
        this.saveForm(this.jsonList)
      }
    },
    goToPublish() {
      this.jsonList = JSON.stringify(this.items)
      this.formvo.title = this.title
      this.formvo.description = this.description
      this.formvo.values = this.jsonList
      if (!this.formId) {
        formApi.addForm(this.formvo).then(res => {
          this.formId = res.data.formItem.formId
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/publish/', query: { id: res.data.formItem.formId }})
        })
      }
    },
    goToData() {
      if (!this.formId) {
        this.jsonList = JSON.stringify(this.items)
        this.formvo.title = this.title
        this.formvo.description = this.description
        this.formvo.values = this.jsonList
        formApi.addForm(this.formvo).then(res => {
          this.formId = res.data.formItem.formId
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/formData/', query: { id: res.data.formItem.formId }})
        })
      }
    },
    goToLogic() {
      if (!this.formId) {
        this.jsonList = JSON.stringify(this.items)
        this.formvo.title = this.title
        this.formvo.description = this.description
        this.formvo.values = this.jsonList
        formApi.addForm(this.formvo).then(res => {
          this.formId = res.data.formItem.formId
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/logic/', query: { id: res.data.formItem.formId }})
        })
      }
    },
    goToStatistics() {
      if (!this.formId) {
        this.jsonList = JSON.stringify(this.items)
        this.formvo.title = this.title
        this.formvo.description = this.description
        this.formvo.values = this.jsonList
        formApi.addForm(this.formvo).then(res => {
          this.formId = res.data.formItem.formId
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/statistics/', query: { id: res.data.formItem.formId }})
        })
      }
    },
    saveForm(values) {
      this.formvo.title = this.title
      this.formvo.description = this.description
      this.formvo.values = values
      // console.log(this.formvo)
      formApi.addForm(this.formvo).then(res => {
        this.formId = res.data.formItem.formId
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      })
    },
    update(id, values) {
      this.formvo.title = this.title
      this.formvo.description = this.description
      this.formvo.values = values
      this.formvo.id = id
      formApi.update(this.formvo).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.formId = this.$route.params.id
        const id = this.$route.params.id
        this.getInfo(id)
      }
    },
    getInfo(id) {
      formApi.getFormItemById(id).then(res => {
        this.items = JSON.parse(res.data.formItem.item)
        this.description = res.data.formItem.description
        console.log(this.items)
        formApi.getFormById(id).then(res => {
          this.title = res.data.form.name
        })
      })
    },
    // 开始拖拽事件
    onStart() {
      this.drag = true
    },
    // 拖拽结束事件
    onEnd() {
      this.drag = false
    }
  }
}
</script>

<style scoped>
 /*被拖拽对象的样式*/
.item {
  padding: 6px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
}
  /*选中样式*/
.chosen {
  border: solid 2px #3089dc !important;
}
  .toolbar{
    margin:11px 17px 2px 17px;
    font-size: 1rem;
  }
  .toolbar:hover{
    color:lightseagreen;
    cursor: pointer;
  }
  .editor{
    width: 100%;
    position: relative;
  }
  .editor:hover{
    width: 100%;
    background-color: rgba(32, 178, 171, 0.266);
    cursor: pointer;
  }
  .zujian{
    width: 100%;
    position: relative;
  }
  .zujian:hover{
    width: 100%;
    background-color: rgba(32, 178, 171, 0.266);
    cursor: pointer;
  }
  .bg-purple-darkTwo {
    border-right: lightseagreen solid 1.7px;
    height: 100vh;
  }
  .bg-purple-darkOne {
    background: #f9fbfe;
    height: 100vh;
  }
  .bg-purple-darks {
    background: #ffffff;
    height: 100vh;
  }
  .bg-purple-darkThree {
    border-left: lightseagreen solid 1.7px;
    height: 100vh;
  }
  .outer {
    height: 90vh;
    overflow-y: scroll;
  }
  .inter {
    height: 100vh;
    width: 100%;
  }
</style>
