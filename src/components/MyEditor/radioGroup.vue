<template>
    <div style="padding:11px" class="zujian" @click="callBack">
        <p>{{ label }}</p>
        <el-radio-group v-model="defaultValue">
            <el-radio v-for="(item,index) in radioListHere" :key="index" :label="item.radioValue">{{ item.radioLabel }}</el-radio>
        </el-radio-group>
    </div>
</template>

<script>

export default {
    props: {
      index: {
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
    },
    data() {
        return {
            radioGroup: {},
            component : 'radioGroup',
            radioListHere: this.radioList
        }
    },
    methods: {
        callBack() {
            this.$emit('callBack',this.component,this.index)
        }
    },
    created() {
       
    }
}
</script>

<style>

</style>