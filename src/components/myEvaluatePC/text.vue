<template>
  <el-col :span="girdHere">
    <div class="zujian" :style="styleList" @click="callBack()">
      <i class="el-icon-delete" style="z-index: 99;" @click="delCallBack()" />
      <el-input v-model="componentValueHere" type="textarea" :rows="2" placeholder="请输入内容" />
    </div>
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
    },
    componentValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      component: 'textScore',
      styleList: 'height: ' + this.height + 'px;border: 1px lightseagreen solid;',
      girdHere: this.gird,
      componentValueHere: this.componentValue
    }
  },
  watch: {
    height(newDF, oldDF) {
      this.styleList = 'height: ' + newDF + 'px;border: 1px lightseagreen solid;'
      console.log(newDF)
    },
    gird(newDF, oldDF) {
      this.girdHere = newDF
      console.log(newDF)
    },
    componentValue(newDF, oldDF) {
      this.componentValueHere = this.componentValue
    }
  },
  methods: {
    callBack() {
      this.$emit('callBack', this.component, this.optionKey, '', '', this.gird, this.height)
    },
    delCallBack() {
      this.$emit('delCallBack', this.component, this.optionKey)
    }
  }
}
</script>
