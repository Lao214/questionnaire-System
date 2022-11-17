import request from '@/utils/request'

export default {
  addUI(formvo) {
    return request({
      url: '/webApi/evaluateUi/saveUIJSONPC',
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
  },
  getUiKey(formId) {
    return request({
      url: '/webApi/evaluateUi/getUiKeyPC/' + formId,
      method: 'get'
    })
  }
}
