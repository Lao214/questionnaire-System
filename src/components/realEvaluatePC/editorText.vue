<template>
  <div>
    <el-col :span="girdHere">
      <div class="zujian" :style="styleList">
        <div style="border: 1px solid rgba(0, 0, 0, 0); margin-top: 10px">
          <div v-html="html" />
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  props: {
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
    componentValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      show: false,
      html: '',
      toolbarConfig: {
        excludeKeys: ['bulletedList', 'numberedList']
      },
      editorConfig: {
        placeholder: '请输入您的反馈文字，在失去鼠标🖱️的焦点后，该文本编辑器的工具栏会消失以供您预览效果...',
        MENU_CONF: {}
      },
      component: 'editorTextScore',
      styleList: 'height: ' + this.height + 'px;border: 1px rgba(32, 178, 171, 0) solid;',
      girdHere: this.gird,
      componentValueHere: this.componentValue
    }
  },
  watch: {
    height(newDF, oldDF) {
      this.styleList = 'height: ' + newDF + 'px;border: 1px rgba(32, 178, 171, 0) solid;'
      console.log(newDF)
    },
    gird(newDF, oldDF) {
      this.girdHere = newDF
      console.log(newDF)
    },
    componentValue(newDF, oldDF) {
      this.componentValueHere = newDF
    },
    html(newDF, oldDF) {
      this.componentValueHere = newDF
    }
  },
  mounted() {
    setTimeout(() => {
      this.html = this.componentValueHere
    }, 500)
  }
}
</script>

<style>
/* table 样式 */
table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}

/* ul ol 样式 */
ul, ol {
  margin: 10px 0 10px 20px;
}
</style>
