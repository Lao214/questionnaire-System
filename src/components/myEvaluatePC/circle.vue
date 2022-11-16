<template>
  <el-col :span="girdHere">
    <div class="zujian" :style="styleList" @click="callBack()">
      <i class="el-icon-delete" style="z-index: 99;" @click="delCallBack()" />UI序号：{{ optionKey }}
      <div class="circleBox">
        <el-progress type="circle" style="padding:1rem;" stroke-linecap="square" :percentage="parseInt(percentageHere)" :show-text="false" :color="colors" />
        <div class="textCenter">
          <span>{{ text }}</span>
          <div :style="colorHere">{{ componentValueHere }}分</div>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  props: {
    componentValue: {
      type: String,
      default: ''
    },
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
    text: {
      type: String,
      default: ''
    },
    colors: {
      type: Array,
      default: () => []
    },
    result: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      colorHere: '',
      component: 'circleScore',
      percentageHere: parseFloat(this.componentValue) / this.colors[4].percentage * 100,
      componentValueHere: this.componentValue,
      styleList: 'height: ' + this.height + 'px;border: 1px lightseagreen solid;',
      girdHere: this.gird,
      resultHere: this.result
    }
  },
  watch: {
    componentValue(newDF, oldDF) {
      this.componentValueHere = this.componentValue
      this.percentageHere = parseFloat(this.componentValue) / this.colors[4].label * 100
      // console.log(this.percentageHere)
      // console.log(newDF / this.colors[4].label * 100)
      if (newDF / this.colors[4].label * 100 < this.colors[0].percentage) {
        this.colorHere = 'color:' + this.colors[0].color
      } else if (newDF / this.colors[4].label * 100 >= this.colors[0].percentage && newDF / this.colors[4].label * 100 < this.colors[1].percentage) {
        this.colorHere = 'color:' + this.colors[1].color
      } else if (newDF / this.colors[4].label * 100 >= this.colors[1].percentage && newDF / this.colors[4].label * 100 < this.colors[2].percentage) {
        this.colorHere = 'color:' + this.colors[2].color
      } else if (newDF / this.colors[4].label * 100 >= this.colors[2].percentage && newDF / this.colors[4].label * 100 < this.colors[3].percentage) {
        this.colorHere = 'color:' + this.colors[3].color
      } else if (newDF / this.colors[4].label * 100 >= this.colors[3].percentage) {
        this.colorHere = 'color:' + this.colors[4].color
      }
    },
    height(newDF, oldDF) {
      this.styleList = 'height: ' + newDF + 'px;border: 1px lightseagreen solid;'
      console.log(newDF)
    },
    gird(newDF, oldDF) {
      this.girdHere = newDF
      console.log(newDF)
    },
    result(newDF, oldDF) {
      this.resultHere = newDF
      console.log(newDF)
    }
  },
  created() {
    if (this.componentValueHere / this.colors[4].label * 100 < this.colors[0].percentage) {
      this.colorHere = 'color:' + this.colors[0].color
    } else if (this.componentValueHere / this.colors[4].label * 100 >= this.colors[0].percentage && this.componentValue / this.colors[4].label * 100 < this.colors[1].percentage) {
      this.colorHere = 'color:' + this.colors[1].color
    } else if (this.componentValueHere / this.colors[4].label * 100 >= this.colors[1].percentage && this.componentValue / this.colors[4].label * 100 < this.colors[2].percentage) {
      this.colorHere = 'color:' + this.colors[2].color
    } else if (this.componentValueHere / this.colors[4].label * 100 >= this.colors[2].percentage && this.componentValue / this.colors[4].label * 100 < this.colors[3].percentage) {
      this.colorHere = 'color:' + this.colors[3].color
    } else if (this.componentValueHere / this.colors[4].label * 100 >= this.colors[3].percentage) {
      this.colorHere = 'color:' + this.colors[4].color
    }
  },
  methods: {
    callBack() {
      this.$emit('callBack', this.component, this.optionKey, this.percentageHere, this.text, this.gird, this.height, this.resultHere)
    },
    delCallBack() {
      this.$emit('delCallBack', this.component, this.optionKey)
    }
  }
}
</script>

<style  lang="scss">
  // 进度环
.circleBox {
    .el-progress{
         width: 160px;
         padding: 1px;
     }
      position: relative;
      text-align: center;
      .textCenter {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        div {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 5px;
        }
        span {
          font-size: 14px;
          color: #999999;
        }
      }
}

.zujian:hover{
  background-color: rgba(32, 178, 171, 0.266);
  cursor: pointer;
}
</style>
