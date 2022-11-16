<template>
  <div style="padding:11px" class="zujian" @click="callBack">
    <span class="demonstration">{{ label }}<i id="del" class="el-icon-delete" style="position: absolute;top: 17%;right: 2%;" @click="delCallBack" /></span>
    <el-slider v-model="defaultValueHere" :max="max" :min="min" :step="step" @input="propDefaultValue(defaultValueHere)" />
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
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      component: 'slider',
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
::v-deep .el-slider__bar{
  background-image: linear-gradient(to right, rgb(25, 144, 138), lightseagreen);
  /* background-color: #6118b2; */
}
::v-deep .el-slider__runway{
  background-color: rgba(125, 193, 190, 0.491);
}

::v-deep .el-slider__marks-text {
  white-space:nowrap;
}

::v-deep .el-slider__button{
    /* background-color: rgb(36, 49, 105); */
    border:1.5px solid  lightseagreen;
    height: 1rem;
    width: 1rem;
}

</style>
