<template>
  <div style="padding:11px">
    <p>{{ label }}</p>
    <el-radio-group v-model="defaultValueHere">
      <el-radio v-for="(item, index) in radioList" :key="index" :label="item.radioValue + ''"  @change="propDefaultValue(item.radioValue, item.score)">{{ item.radioLabel }}</el-radio>
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
    },
    nickname: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      radioGroup: {},
      component: 'radioGroup',
      defaultValueHere: this.defaultValue
    }
  },
  watch: {
    defaultValue(newDF, oldDF) {
      this.defaultValueHere = newDF
      console.log(oldDF)
    }
  },
  methods: {
    propDefaultValue(value, score) {
      console.log(value)
      console.log(score)
      console.log(this.nickname)
      this.$emit('propDefaultValue', this.modelValue, value, score, this.nickname)
      console.log(this.modelValue)
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
  box-shadow: none !important;
}


</style>
