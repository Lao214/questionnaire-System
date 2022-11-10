<template>
    <div style="padding:11px" class="zujian" @click="callBack">
      <i id="del" class="el-icon-delete" style="position: absolute;top: 0%;right: 2%;z-index: 999;" />
      <el-image :src="defaultValue"></el-image>
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
        component: 'imageShow',
        sliderNumber: 0,
        src: this.defaultValue
      }
    },
    methods: {
      callBack() {
        this.$emit('callBack', this.component, this.optionKey)
      }
    }
  }
  </script>
  
  