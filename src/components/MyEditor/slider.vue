<template>
  <div style="padding:11px" class="zujian" @click="callBack">
    <span class="demonstration">{{ label }}</span>
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

<style>

</style>
