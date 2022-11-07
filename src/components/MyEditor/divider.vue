<template>
    <div style="padding:11px" class="zujian" @click="callBack">
        <el-divider></el-divider>
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
        component: 'divider',
        sliderNumber: 0
      }
    },
    methods: {
      callBack() {
        this.$emit('callBack', this.component, this.optionKey)
      }
    }
  }
  </script>