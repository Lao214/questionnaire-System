<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark2">
              <i id="return" class="el-icon-d-arrow-left" style="font-size: 1.2rem;padding:0.7rem;" />
              <i id="return" class="el-icon-upload2" style="font-size: 1.2rem;padding:0.7rem;" />
              <i id="return" class="el-icon-document-checked" style="font-size: 1.2rem;padding:0.7rem;" @click="saveUI()" />
              <i id="return" class="el-icon-full-screen" style="font-size: 1.2rem;padding:0.7rem;" />
              <i id="return" class="el-icon-goods" style="font-size: 1.2rem;padding:0.7rem;" />
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark3">
              <p style="text-align:center;font-weight: 600;margin-top: 0;padding-top: 1rem;">UI组件</p>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('','circleScore','200',4,'21','分数：',JSON.parse(JSON.stringify(colors)))">环形分数</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('','progressScore','100',6,'21','分数：',JSON.parse(JSON.stringify(colors)))">条形分数</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('','imageShow','200',6,'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg','','','200','300')">图片展示</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('','editorTextScore','400',12,'请输入文字描述')">文字描述</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('','myInput',)">表格</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('','dividerScore','100',24,'')">分割线</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('','grid','200',4)">空白栅格</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="add('','myInput',)">正态分布图</el-button>
              <el-divider />
              <!-- <p style="text-align:center;font-weight: 600;">布局方式</p>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="layout()">添加栅格</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="layout()">垂直布局</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="layout()">水平布局</el-button>
              <el-button style="margin:7px;padding: 11px;width: 91px;" @click="layout()">十字布局</el-button> -->
            </div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <component :is="item.component" v-for="(item, index) in itemUI" :key="index" :gird="item.gird" :component-value="item.componentValue" :text="item.text" :colors="item.colors" :option-key="index" :height="item.height" :image-height="item.imageHeight" :image-width="item.imageWidth" :result="item.result" @callBack="callBack" @delCallBack="delCallBack" @wangEditorChange="wangEditorChange" />
        </div>
      </el-col>
    </el-row>
    <transition name="el-zoom-in-bottom">
      <div v-show="show2" class="transition-box">
        <i class="el-icon-close" style="position:absolute;right:0%;top:1%;font-size:1.7rem;cursor: pointer;" @click="show2 = false" />
        <!--colors begin-->
        <div style="width: 30%;display: flex;flex-wrap: wrap;width: 45%;">
          <div v-for="(item,index) in thisColorsList" :key="index">
            颜色：<el-input v-model="item.color" style="margin:7px 1rem 0rem 0rem;width: 160px;" @input="changeColorInput(item.color, index)" />
            最大值：<el-input-number v-model="item.label" style="margin:7px 1rem 0rem 0rem;width: 160px;" @change="changePercentageInput(item.label, index)" />
          </div>
        </div>
        <!--colors end-->
        <div style="display: flex;justify-content: end;position: absolute;right: 3%;top:30%;">
          <span style="line-height: 2rem;">结果：</span>
          <el-select v-model="thisResult" placeholder="请选择结果" style="margin-left:1rem;margin-right:1rem;width: 160px;" @change="changeThisResult(thisResult)">
            <el-option v-for="(item, index) in result" :key="index" :label="item" :value="item" />
          </el-select>
          <span style="line-height: 2rem;">预览值：</span><el-input v-model="thisValue" style="margin-left:1rem;margin-right:1rem;width: 160px;" @input="changeThisValue(thisValue)" />
        </div>
        <div style="display: flex;justify-content: end;position: absolute;right: 3%;top:10%;">
          <span v-if="component === 'imageShow'" style="line-height: 2rem;">图片高度：</span><el-input v-if="component === 'imageShow'" v-model="thisImageHeight" style="margin-left:1rem;margin-right:1rem;width: 160px;" @input="changeThisImageHeight(thisImageHeight)" />
          <span v-if="component === 'imageShow'" style="line-height: 2rem;">图片宽度：</span><el-input v-if="component === 'imageShow'" v-model="thisImageWidth" style="margin-left:1rem;margin-right:1rem;width: 160px;" @input="changeThisImageWidth(thisImageWidth)" />
          <span v-if="component !== 'imageShow'" style="line-height: 2rem;">高度：</span><el-input v-if="component !== 'imageShow'" v-model="thisHight" :disabled="HightUnUsed" style="margin-left:1rem;margin-right:1rem;width: 160px;" @input="changeThisHight(thisHight)" />
          <span style="line-height: 2rem;">描述：</span><el-input v-model="thisText" style="margin-left:1rem;margin-right:1rem;width: 160px;" @input="changeThisText(thisText)" />
          <span style="line-height: 2rem;">栅格数：</span><el-input v-model="thisGird" style="margin-left:1rem;margin-right:1rem;width: 160px;" @input="changeThisGird(thisGird)" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import circleScore from '@/components/myEvaluatePC/circle.vue'
import progressScore from '@/components/myEvaluatePC/progress.vue'
import dividerScore from '@/components/myEvaluatePC/divider.vue'
import grid from '@/components/myEvaluatePC/grid.vue'
import editorTextScore from '@/components/myEvaluatePC/editorText.vue'
import imageShow from '@/components/myEvaluatePC/imageShow.vue'
import formApi from '@/api/form/form'

export default {
  components: {
    circleScore,
    progressScore,
    dividerScore,
    editorTextScore,
    imageShow,
    grid
  },
  data() {
    return {
      styleList: '',
      itemUI: [],
      colors: [
        { color: '#f56c6c', percentage: 20, label: 20 },
        { color: '#e6a23c', percentage: 40, label: 40 },
        { color: '#5cb87a', percentage: 60, label: 60 },
        { color: '#1989fa', percentage: 80, label: 80 },
        { color: '#6f7ad3', percentage: 100, label: 100 }
      ],
      serialNo: 0,
      show2: false,
      optionIndex: '',
      thisColorsList: [],
      thisValue: '',
      thisHight: '',
      thisGird: 0,
      thisText: '',
      formId: '',
      result: [],
      thisResult: '',
      component: '',
      thisImageHeight: '',
      thisImageWidth: '',
      HightUnUsed: false,
      formvo: {}
    }
  },
  created() {
    if (this.$route.query.id) {
      this.formId = this.$route.query.id
    } else if (this.$route.params.id) {
      this.formId = this.$route.params.id
    }
    this.getFormById()
  },
  methods: {
    add(result, name, height, gird, componentValue, text, colors, imageHeight, imageWidth) {
      this.itemUI.push({
        component: name,
        height: height,
        gird: gird,
        componentValue: componentValue,
        text: text,
        colors: colors,
        imageHeight: imageHeight,
        imageWidth: imageWidth,
        result: result
      })
    },
    callBack(component, optionKey, componentValue, text, gird, height, result, imageHeight, imageWidth) {
      this.component = component
      this.show2 = true
      this.thisText = text
      this.thisValue = componentValue
      this.optionIndex = optionKey
      this.thisGird = gird
      this.thisHight = height
      this.thisResult = result
      this.thisImageHeight = imageHeight
      this.thisImageWidth = imageWidth
      if (component === 'circleScore') {
        this.thisColorsList = JSON.parse(JSON.stringify(this.itemUI[this.optionIndex].colors))
      } else if (component === 'progressScore') {
        this.thisColorsList = JSON.parse(JSON.stringify(this.itemUI[this.optionIndex].colors))
      }
    },
    delCallBack(component, optionKey) {
      this.itemUI.splice(optionKey, 1)
      this.show2 = false
    },
    changeThisValue(thisValue) {
      this.itemUI[this.optionIndex].componentValue = thisValue
    },
    changeThisText(thisText) {
      this.itemUI[this.optionIndex].text = thisText
    },
    changeThisHight(thisHight) {
      this.itemUI[this.optionIndex].height = thisHight
    },
    changeThisGird(thisGird) {
      this.itemUI[this.optionIndex].gird = parseInt(thisGird)
    },
    changeThisResult(thisResult) {
      this.itemUI[this.optionIndex].result = thisResult
    },
    changeColorInput(color, index) {
      this.itemUI[this.optionIndex].colors[index].color = color
    },
    changeThisImageHeight(thisImageHeight) {
      this.itemUI[this.optionIndex].imageHeight = thisImageHeight
      this.thisHight = thisImageHeight
    },
    changeThisImageWidth(thisImageWidth) {
      this.itemUI[this.optionIndex].imageWidth = thisImageWidth
    },
    changePercentageInput(label, index) {
      this.itemUI[this.optionIndex].colors[index].label = parseFloat(label)
      if (index !== 4) {
        for (var item of this.itemUI[this.optionIndex].colors) {
          item.percentage = item.label / this.itemUI[this.optionIndex].colors[4].label * 100
          // console.log(item.percentage)
        }
      } else if (index === 4) {
        this.itemUI[this.optionIndex].colors[index].label = parseFloat(label)
        this.itemUI[this.optionIndex].colors[index].percentage = parseFloat(label)
        for (var i = 0; i < 5; i++) {
          if (i !== index) {
            this.itemUI[this.optionIndex].colors[i].percentage = this.itemUI[this.optionIndex].colors[i].label / this.itemUI[this.optionIndex].colors[4].label * 100
            console.log(this.itemUI[this.optionIndex].colors[i].percentage)
          }
        }
      }
      // console.log(this.itemUI)
    },
    getFormById() {
      formApi.getFormById(this.formId).then(res => {
        var logic = res.data.form.evaluateLogic
        var resultArray = logic.split(',')
        for (var i = 1; i < resultArray.length; i++) {
          this.result.push('result' + (this.result.length + 1))
        }
      })
    },
    wangEditorChange(html, index) {
      this.thisValue = html
      this.itemUI[index].componentValue = html
      console.log(this.itemUI)
    },
    saveUI() {
      this.formvo['uiType'] = 'PC'
      this.formvo['data'] = this.itemUI
      this.formvo['id'] = this.formId
      console.log(this.itemUI)
    }
  }
}
</script>

<style scoped>
  .bg-purple-dark {
    height: 100vh;
  }
  .bg-purple-dark2 {
    height: 5vh;
    border-right: lightseagreen 1px solid;
    border-bottom: lightseagreen 1px solid;
  }
  .bg-purple-dark3 {
    height: 95vh;
    border-right: lightseagreen 1px solid;
  }
  .bg-purple {
    height: 100vh;
    padding: 7px;
  }
  .grid-content {
    min-height: 36px;
  }
  #return:hover{
    color: lightseagreen;
    cursor: pointer;
  }
  .transition-box {
    justify-content: start;
    position: absolute;
    bottom: 0%;
    margin-bottom: 10px;
    width: 100%;
    height: 270px;
    border-radius: 4px;
    background-color: lightseagreen;
    text-align: center;
    color: #fff;
    padding: 20px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
.outer {
    height: 210px;
    overflow-y: scroll;
}
.inter {
    height: 270px;
    width: 100%;
}
</style>
