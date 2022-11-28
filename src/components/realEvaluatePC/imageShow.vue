<template>
  <el-col :span="girdHere">
    <div class="zujian" :style="styleList">
      <div style="position:relative;">
        <el-image :style="imageList" :src="componentValueHere" />
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  props: {
    componentValue: {
      type: String,
      default: ''
    },
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
    imageHeight: {
      type: String,
      default: ''
    },
    imageWidth: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      component: 'imageShow',
      styleList: 'height: ' + this.heightHere + 'px;border: 1px rgba(32, 178, 171, 0) solid;',
      imageList: 'height: ' + this.imageHeight + 'px;width: ' + this.imageWidth + 'px;',
      girdHere: this.gird,
      heightHere: this.height,
      componentValueHere: this.componentValue
    }
  },
  watch: {
    heightHere(newDF, oldDF) {
      this.styleList = 'height: ' + newDF + 'px;border: 1px rgba(32, 178, 171, 0) solid;'
      console.log(newDF)
    },
    imageHeight(newDF, oldDF) {
      this.imageList = 'height: ' + newDF + 'px;width: ' + this.imageWidth + 'px;'
      this.heightHere = newDF
      console.log(newDF)
    },
    imageWidth(newDF, oldDF) {
      this.imageList = 'height: ' + this.imageHeight + 'px;width: ' + newDF + 'px;'
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
      this.$emit('callBack', this.component, this.optionKey, this.componentValueHere, '', this.gird, this.height, '', this.imageHeight, this.imageWidth)
    },
    delCallBack() {
      this.$emit('delCallBack', this.component, this.optionKey)
    }
  }
}
</script>
