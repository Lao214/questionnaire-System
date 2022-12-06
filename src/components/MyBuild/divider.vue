<template>
  <div style="padding:11px" class="zujian">
    <!-- <i id="del" class="el-icon-delete" style="position: absolute;top: 17%;right: 2%;" /> -->
    <el-divider />
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
  }
}
</script>
