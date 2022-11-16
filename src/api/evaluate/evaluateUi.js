import request from '@/utils/request'

export default {
  addUI(formvo) {
    return request({
      url: '/webApi/evaluateUi/saveUIJSON',
      method: 'post',
      data: formvo
    })
  },
  updateUI(formvo) {
    return request({
      url: '/webApi/evaluateUi/updateUIJSON',
      method: 'post',
      data: formvo
    })
  }
}