<template>
  <div>
    <k-form-design ref="kfd" title="富士康大学表单设计器" @save="handleSave" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsonData: {
        list: [
          {
            type: 'textarea',
            label: '文本框',
            icon: 'icon-edit',
            options: {
              width: '100%',
              minRows: 4,
              maxRows: 6,
              defaultValue: '',
              disabled: false,
              placeholder: '请输入'
            },
            model: 'textarea_1584772782841',
            key: 'textarea_1584772782841',
            rules: [
              {
                required: false,
                message: '必填项'
              }
            ]
          }
        ],
        config: {
          layout: 'horizontal',
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 18
          },
          hideRequiredMark: false,
          customStyle: ''
        }
      }
    }
  },
  mounted() {
    this.importData()
  },
  methods: {
    handleSave(values) {
      alert('触发保存方法')
      console.log(values)
    },
    importData() {
      this.$refs.kfd.handleSetData(this.jsonData)
    }
  }
}
</script>
