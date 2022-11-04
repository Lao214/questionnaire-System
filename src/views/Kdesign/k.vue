<template>
    <div >
        <el-row>
            <el-col :span="2">
                <div class="grid-content bg-purple-darkOne">
                  
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple-darkTwo">
                    <el-button @click="addRadio('radioGroup','第一题：', '', '', false, JSON.parse(JSON.stringify(defaultRadioOp)))">单选框组</el-button>
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
                                <el-input v-model="title" v-show="!show"><el-button slot="append" @click="show = true" icon="el-icon-check"></el-button></el-input>
                            </el-row>
                            <el-row style="padding:11px" class="zujian">
                                <weditor :result-text-parent="title"></weditor>
                            </el-row>
                            <component :radioList="item.defaultRadioOp" :is="item.component" :text="item.text" :label="item.label" :index="index" :defaultValue="item.defaultValue" @callBack="callBack" v-for="(item, index) in items" :key="index" ></component>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-darkThree">
                    <el-row style="padding:11px;display: flex;justify-content: end;line-height: 3rem;"><span>选项key：</span><el-button style="width: 70%;">{{ index }}</el-button></el-row>
                    <el-row style="padding:11px;display: flex;justify-content: end;line-height: 3rem;"><span>标签：</span><el-input v-model="label" @input="changeTitle(label)"  style="width: 70%;"></el-input></el-row>
                    <el-row style="padding:11px;display: flex;justify-content: end;line-height: 3rem;"><span>数据字段：</span><el-input v-model="modelValue" @input="changeModelValue(modelValue)" style="width: 70%;"></el-input></el-row>
                    <el-row style="padding:11px;display: flex;justify-content: end;line-height: 3rem;"><span>默认值：</span><el-input v-model="defaultValue" @input="changeDefaultValue(defaultValue)" style="width: 70%;"></el-input></el-row>
                    <el-row style="padding:11px;display: flex;justify-content: center;line-height: 3rem;"><el-radio-button  v-model="requireOption" label="必填"></el-radio-button></el-row>
                    <div style="padding:7px" v-if="thisRadioList.length>0">
                        <el-divider></el-divider>
                        <p style="text-align:center;font-weight: 600;">选项配置</p>
                        <div v-for="(item,index) in thisRadioList" :key="index">
                            <el-row style="padding:4px;display: flex;justify-content: center;line-height: 3rem;">
                                <el-input style="margin-right:1rem" v-model="item.radioLabel" @input="changeLabelInput(item.radioLabel,index)"></el-input>  <el-input v-model="item.radioValue" @input="changeValueInput(item.radioValue,index)"></el-input>
                            </el-row>
                        </div>
                        <el-button size="mini" style="display:block;margin:0 auto;" @click="addRadioList"><i class="el-icon-plus"></i></el-button>
                        <el-divider></el-divider>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { title } from 'process'
import weditor from '../../components/editor/indextor.vue'
import radioGroup from '../../components/MyEditor/radioGroup.vue'

export default {
    components: {
        weditor,
        radioGroup
    },
    data() {
        return {
            show: true,
            title: '请输入你的标题',
            value: 0,
            count: 0,
            items: [],
            options: [],
            defaultRadioOp:[
                {"radioLabel" : "选项1","radioValue" : "1"},
                {"radioLabel" : "选项2","radioValue" : "2"},
            ],
            requireOption: 0,
            defaultValue: '',
            label: '',
            modelValue: '',
            index: 0,
            thisRadioList: []
        }
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
       console.log(this.items)
      },
      add(name, label, defaultValue, modelValue, require, options) {
       this.items.push({
         component: name,
         label: label,
         defaultValue: defaultValue,
         modelValue: modelValue,
         require: require
       })
       console.log(this.items)
      },
      callBack(component,key) {
        this.label = this.items[key].label
        this.index = key
        this.modelValue =  this.items[key].modelValue
        this.defaultValue =  this.items[key].defaultValue
        if(component === 'radioGroup'){
            this.thisRadioList = JSON.parse(JSON.stringify(this.items[this.index].defaultRadioOp))
        }
      },
      addRadioList() {
            this.thisRadioList.push({
                "radioLabel" : "选项" + (this.thisRadioList.length+1),
                "radioValue" : this.thisRadioList.length+1
            })
            this.items[this.index].defaultRadioOp.push({"radioLabel" : "选项" + (this.thisRadioList.length),"radioValue" : this.thisRadioList.length})
      },
      changeLabelInput(value,index) {
        // console.log(value)
        // console.log(index)
        this.items[this.index].defaultRadioOp[index].radioLabel = value
      },
      changeValueInput(value,index) {
        // console.log(value)
        // console.log(index)
        this.items[this.index].defaultRadioOp[index].radioValue = value
      },
      changeTitle(value) {
        this.items[this.index].label = value
      },
      changeDefaultValue(value) {
        this.items[this.index].defaultValue = value
      },
      changeModelValue(value) {
        this.items[this.index].modelValue = value
      },
      saveData() {
        console.log(this.items)
        console.log(JSON.stringify(this.items))
        console.log(JSON.parse(JSON.stringify(this.items)))
      }
    },
    created() {
        this.items = JSON.parse('[{"component":"radioGroup","label":"第二题：","defaultValue":"","modelValue":"","require":false,"defaultRadioOp":[{"radioLabel":"选项1","radioValue":"1"},{"radioLabel":"选项2","radioValue":"2"}]}]')
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
