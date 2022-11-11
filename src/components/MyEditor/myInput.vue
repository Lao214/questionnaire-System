<template>
  <div style="padding:11px" class="zujian" @click="callBack">
    <p class="demonstration">{{ label }}<i id="del" class="el-icon-delete" style="position: absolute;top: 17%;right: 2%;" @click="delCallBack" /></p>
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
    defaultValue(newDF, oldDF) {
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
    },
    delCallBack() {
      this.$emit('delCallBack', this.component, this.optionKey)
    }
  }
}
</script>

<style scoped>
::v-deep .search .el-input{
    position: relative;
    font-size: 22px;
    width: 45%;
}
::v-deep .search .el-input__inner{
    padding-left: 40px;
    width: 813px;
    height: 50px;
    font-size: 20px;
    border-radius: 10px !important;
}
</style>
