import request from '@/utils/request'

export default {
  postFormData(formvo) {
    return request({
      url: '/webApi/formData/postFormData',
      method: 'post',
      data: formvo
    })
  },
  getFormDataList(current, limit, formQuery) {
    return request({
      url: '/webApi/formData/getFormDataListPage/' + current + '/' + limit,
      method: 'post',
      data: formQuery
    })
  }
}
