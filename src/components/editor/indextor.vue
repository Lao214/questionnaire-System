<template>
    <div>
      <div>
        <!-- <button @click="printEditorHtml">print html</button>
        <button @click="getEditorText">print text</button> -->
      </div>
      <div  style="border: 1px solid #ccc; margin-top: 10px">
        <!-- 工具栏 -->
        <Toolbar v-show="show" style="border-bottom: 1px solid #ccc"  :editor="editor"  :defaultConfig="toolbarConfig"/>
        <!-- 编辑器 -->
        <Editor
          style="height: 400px; overflow-y: hidden"
          :defaultConfig="editorConfig"
          v-model="html"
          @onChange="onChange"
          @onCreated="onCreated"
          @onBlur="onBlur"
          @onFocus="onFocus"
        />
      </div>
      <!-- <div style="margin-top: 10px">
        <textarea
          v-model="html"
          readonly
          style="width: 100%; height: 200px; outline: none"
        ></textarea>
      </div> -->
      <!-- <div v-html="html" @click="show()"></div> -->
        
      <!-- <div style="padding:7px;text-align: center;">
        <el-button type="primary"  @click="callBack"  >确 定</el-button>
      </div> -->
    </div>
  </template>
  
  <script>
  import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
  
  export default {
    name: "MyEditor",
    components: { Editor, Toolbar },
    props: {
      resultTextParent: {
            type: String,
            default: ''
        },
    },
    data() {
      return {
        editor: null,
        show: false,
        html: '',
        toolbarConfig: {
            //toolbarKeys: [],
            excludeKeys: [ 'bulletedList', 'numberedList' ]
        },
        editorConfig: {
          placeholder: "请输入内容...",
          // autoFocus: false,
          // 所有的菜单配置，都要在 MENU_CONF 属性下
          MENU_CONF: {},
        },
      };
    },
    methods: {
      onCreated(editor) {
        this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
      },
      onChange(editor) {
        console.log("onChange", editor.getHtml()) // onChange 时获取编辑器最新内容
      },
      getEditorText() {
        const editor = this.editor
        if (editor == null) return
        console.log(editor.getText()) // 执行 editor API
      },
      printEditorHtml() {
        const editor = this.editor
        if (editor == null) return
        console.log(editor.getHtml()); // 执行 editor API
      },
      onFocus(editor) {
        this.show = editor.isFocused()
        console.log(editor.isFocused())
      },
      onBlur(editor) {
        this.show = editor.isFocused()
        console.log(editor.isFocused())
      }
    },
    mounted() {
      setTimeout(() => {
        this.html = this.resultTextParent
      }, 500);
    },
    beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
    },
  };
  </script>
  
  <style src="@wangeditor/editor/dist/css/style.css"></style>

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
