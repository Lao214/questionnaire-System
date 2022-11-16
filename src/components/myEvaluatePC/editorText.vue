<template>
  <div>
    <el-col :span="girdHere">
      <div class="zujian" :style="styleList" @click="callBack()">
        <i class="el-icon-delete" style="z-index: 99;" @click="delCallBack()" />UI序号：{{ optionKey }}
        <div style="border: 1px solid #ccc; margin-top: 10px">
          <Toolbar v-show="show" style="border-bottom: 1px solid #ccc" :editor="editor" :default-config="toolbarConfig" />
          <Editor
            v-model="html"
            style="height: 350px; overflow-y: hidden"
            :default-config="editorConfig"
            @onChange="onChange"
            @onCreated="onCreated"
            @onBlur="onBlur"
            @onFocus="onFocus"
          />
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
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
      styleList: 'height: ' + this.height + 'px;border: 1px lightseagreen solid;',
      girdHere: this.gird,
      componentValueHere: this.componentValue
    }
  },
  watch: {
    height(newDF, oldDF) {
      this.styleList = 'height: ' + newDF + 'px;border: 1px lightseagreen solid;'
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
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
      this.$emit('wangEditorChange', editor.getHtml(), this.optionKey)
    },
    getEditorText() {
      const editor = this.editor
      if (editor == null) return
      console.log(editor.getText()) // 执行 editor API
    },
    printEditorHtml() {
      const editor = this.editor
      if (editor == null) return
      console.log(editor.getHtml()) // 执行 editor API
    },
    onFocus(editor) {
      this.show = editor.isFocused()
      // console.log(editor.isFocused())
    },
    onBlur(editor) {
      this.show = editor.isFocused()
      // console.log(editor.isFocused())
    },
    callBack() {
      this.$emit('callBack', this.component, this.optionKey, this.componentValueHere, '', this.gird, this.height)
    },
    delCallBack() {
      this.$emit('delCallBack', this.component, this.optionKey)
    }
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css" />

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
