<template>
    <div style="padding:11px" class="zujian" @click="callBack">
      <p class="demonstration">{{ label }}</p>
      <el-input v-model="defaultValueHere" placeholder="请输入内容" @input="propDefaultValue(defaultValueHere)" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      optionKey: {
        type: Number,
        default: 0
      },
      label: {
        type: String,
        default: ''
      },
      modelValue: {
        type: String,
        default: ''
      },
      defaultValue: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        component: 'myInput',
        sliderNumber: 0,
        defaultValueHere: this.defaultValue
      }
    },
    watch: {
      defaultValue(newDF ,oldDF){
        this.defaultValueHere = newDF
      }
    },
    methods: {
      callBack() {
        this.$emit('callBack', this.component, this.optionKey)
      },
      propDefaultValue(value) {
        console.log(value)
        this.$emit('propDefaultValue', this.component, this.optionKey, value)
      }
    }
  }
  </script>
