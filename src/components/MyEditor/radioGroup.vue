<template>
  <div style="padding:11px" class="zujian" @click="callBack">
    <p>{{ label }}</p>
    <el-radio-group v-model="defaultValueHere">
      <el-radio v-for="(item, index) in radioListHere" :key="index" :label="item.radioValue" @change="propDefaultValue(item.radioValue)">{{ item.radioLabel }}</el-radio>
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
      radioListHere: this.radioList,
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
