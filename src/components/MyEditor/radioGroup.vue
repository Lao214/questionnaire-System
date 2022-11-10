<template>
  <div style="padding:11px" class="zujian" @click="callBack">
    <p>{{ label }}<i id="del" class="el-icon-delete" style="position: absolute;top: 17%;right: 2%;" @click="delCallBack" /></p>
    <el-radio-group v-model="defaultValueHere">
      <el-radio v-for="(item, index) in radioList" :key="index" :label="item.radioValue + ''" @change="propDefaultValue(item.radioValue)">{{ item.radioLabel }}</el-radio>
    </el-radio-group>
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
    },
    radioList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      radioGroup: {},
      component: 'radioGroup',
      // radioListHere: this.radioList,
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
    },
    delCallBack() {
      // this.radioListHere =[]
      this.$emit('delCallBack', this.component, this.optionKey)
    }
  }
}
</script>

<style>
/* 选中后的字体颜色 */
.el-radio__input.is-checked + .el-radio__label {
  color: lightseagreen !important;
}
/* 选中后小圆点的颜色 */
.el-radio__input.is-checked .el-radio__inner {
  background: lightseagreen !important;
  border-color: lightseagreen !important;
}
</style>
