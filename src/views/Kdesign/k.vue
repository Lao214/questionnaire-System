<template>
  <div>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple-darkOne" />
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple-darkTwo">
          <div style="padding:7px">
            <el-button style="margin:7px;padding: 11px;" @click="addRadio('radioGroup','单选框', '', '', false, JSON.parse(JSON.stringify(defaultRadioOp)))">单选框组</el-button>
            <el-button style="margin:7px;padding: 11px;" @click="addSlider('slider','滑动条',50,'',false,100,0,1)">滑动输入</el-button>
            <el-button style="margin:7px;padding: 11px;" @click="add('imageShow','图片展示','https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg','',false)">图片展示</el-button>
            <el-button style="margin:7px;padding: 11px;" @click="add('divider','','','',false)">el分割线</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple-darks">
          <div style="width:100%;background-color: blanchedalmond;height: 47px;"><el-button @click="saveData">保存</el-button></div>
          <div class="outer">
            <div class="inter">
              <el-row style="padding:11px">
                <div class="zujian" @click="show = false">
                  <h2 v-show="show" style="text-align:center;">{{ title }}</h2>
                </div>
                <el-input v-show="!show" v-model="title"><el-button slot="append" icon="el-icon-check" @click="show = true" /></el-input>
              </el-row>
              <el-row style="padding:11px" class="zujian">
                <weditor :result-text-parent="description" />
              </el-row>
              <component :is="item.component" v-for="(item, index) in items" :key="index" :max="item.max" :min="item.min" :step="item.step" :radio-list="item.defaultRadioOp" :text="item.text" :label="item.label" :option-key="index" :default-value="item.defaultValue" @callBack="callBack" @propDefaultValue="propDefaultValue" />
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
import qrCodeApi from '@/api/qrCode/qrcode'
import formApi from '@/api/form/form'

export default {
  components: {
    weditor,
    radioGroup,
    slider,
    imageShow,
    divider
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
      defaultRadioOp: [{ 'radioLabel': '选项1', 'radioValue': '1' }, { 'radioLabel': '选项2', 'radioValue': '2' }],
      requireOption: 0,
      defaultValue: '',
      label: '',
      modelValue: '',
      optionIndex: 0,
      thisRadioList: [],
      thisSliderList: 0,
      sliderMax: 100,
      sliderMin: 0,
      sliderStep: 1
    }
  },
  created() {
    this.items = JSON.parse('[{"component":"radioGroup","label":"第二题：","defaultValue":"","modelValue":"","require":false,"defaultRadioOp":[{"radioLabel":"选项1","radioValue":"1"},{"radioLabel":"选项2","radioValue":"2"}]}]')
  },
  methods: {
    addRadio(name, label, defaultValue, modelValue, require, defaultRadioOp) {
      this.items.push({
        component: name,
        label: label,
        defaultValue: defaultValue,
        modelValue: modelValue,
        require: require,
        defaultRadioOp: defaultRadioOp
      })
    },
    add(name, label, defaultValue, modelValue, require) {
      this.items.push({
        component: name,
        label: label,
        defaultValue: defaultValue,
        modelValue: modelValue,
        require: require
      })
    },
    addSlider(name, label, defaultValue, modelValue, require, max, min, step) {
      this.items.push({
        component: name,
        label: label,
        defaultValue: defaultValue,
        modelValue: modelValue,
        require: require,
        max: max,
        min: min,
        step: step
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
      } else if(component === 'imageShow') {
        this.thisRadioList = []
        this.thisSliderList = 0
      } else if(component === 'divider') {
        this.thisRadioList = []
        this.thisSliderList = 0
      }
    },
    propDefaultValue(component, key, defaultValue) {
      this.label = this.items[key].label
      this.optionIndex = key
      this.modelValue = this.items[key].modelValue
      if (component === 'slider') {
        this.defaultValue = defaultValue
        this.items[this.optionIndex].defaultValue =  parseInt(defaultValue)
      }else {
        this.defaultValue = defaultValue
        this.items[this.optionIndex].defaultValue = defaultValue
      }
    },
    addRadioList() {
      this.thisRadioList.push({ 'radioLabel': '选项' + (this.thisRadioList.length + 1), 'radioValue': this.thisRadioList.length + 1 })
      this.items[this.optionIndex].defaultRadioOp.push({ 'radioLabel': '选项' + (this.thisRadioList.length), 'radioValue': this.thisRadioList.length })
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
        this.items[this.optionIndex].defaultValue =  parseInt(value)
      } else {
        this.items[this.optionIndex].defaultValue = value
      }
    },
    changeModelValue(value) {
      this.items[this.optionIndex].modelValue = value
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
    saveData() {
      console.log(this.items)
      console.log(JSON.stringify(this.items))
      console.log(JSON.parse(JSON.stringify(this.items)))
      console.log(this.title)
      console.log(this.description)
    }
  }
}
</script>

<style>
  .zujian{
    width: 100%;
  }
  .zujian:hover{
    width: 100%;
    background-color: #bed6f842;
    cursor: pointer;
  }
  .bg-purple-darkTwo {
    background: #99a9bf;
    height: 100vh;
  }
  .bg-purple-darkOne {
    background: #b0c8eb;
    height: 100vh;
  }
  .bg-purple-darks {
    background: #ffffff;
    height: 100vh;
  }
  .bg-purple-darkThree {
    background: #a4aaf5;
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
