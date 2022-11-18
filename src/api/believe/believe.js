import request from '@/utils/request'

export default {
  getUserInfoByBelieve(codeAndAppId) {
    return request({
      url: 'http://civetinterface.foxconn.com/open/get_user_info_bycode?' + codeAndAppId,
      method: 'get'
    })
  }
}
