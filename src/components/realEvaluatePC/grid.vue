<template>
  <el-col :span="girdHere">
    <div class="zujian" :style="styleList" />
  </el-col>
</template>

<script>
export default {
  props: {
    optionKey: {
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: ''
    },
    gird: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      component: 'dividerScore',
      styleList: 'height: ' + this.height + 'px;border: 1px rgba(32, 178, 171, 0) solid;',
      girdHere: this.gird
    }
  },
  watch: {
    height(newDF, oldDF) {
      this.styleList = 'height: ' + newDF + 'px;border: 1px rgba(32, 178, 171, 0) solid;'
      console.log(newDF)
    },
    gird(newDF, oldDF) {
      this.girdHere = newDF
      console.log(newDF)
    }
  }
}
</script>
