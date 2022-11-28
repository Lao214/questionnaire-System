<template>
  <div>
    <div class="grid-content bg-purple">
      <component :is="item.component" v-for="(item, index) in thisComponents" :key="index" :gird="item.gird" :component-value="item.componentValue" :text="item.text" :colors="item.colors" :option-key="index" :height="item.height" :image-height="item.imageHeight" :image-width="item.imageWidth" :result="item.result" />
    </div>
  </div>
</template>

<script>
import eUiApi from '@/api/evaluate/evaluateUi'
import circleScore from '@/components/realEvaluatePC/circle.vue'
import progressScore from '@/components/realEvaluatePC/progress.vue'
import dividerScore from '@/components/realEvaluatePC/divider.vue'
import grid from '@/components/realEvaluatePC/grid.vue'
import editorTextScore from '@/components/myEvaluatePC/editorText.vue'
import imageShow from '@/components/realEvaluatePC/imageShow.vue'

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
      result: '',
      formId: '',
      resultArr: [],
      evaluateUi: {},
      thisComponents: []
    }
  },
  created() {
    this.formId = this.$route.query.id
    this.result = JSON.parse(this.$route.query.result)
    this.resultArr = this.result.split(',')
    this.getUiKey()
  },
  methods: {
    getUiKey() {
      eUiApi.getUiKey(this.formId).then(res => {
        this.evaluateUi = res.data.ui
        this.thisComponents = JSON.parse(this.evaluateUi.components)
        for (var i = 0; i < this.thisComponents.length; i++) {
          if (this.thisComponents[i].result) {
            var ress = this.thisComponents[i].result.replace('result', '')
            // console.log(parseInt(res))
            this.thisComponents[i].componentValue = this.resultArr[parseInt(ress) - 1]
          }
        }
      })
    }
  }
}
</script>

<style scoped>

.bg-purple {
    height: 100vh;
    padding: 7px;
  }
</style>
