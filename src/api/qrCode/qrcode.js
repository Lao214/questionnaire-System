import request from '@/utils/request'


export default{
    // 创建表单
    getQrCode(id) {
        return request({
            url: '/webApi/form/qrCode/'+id,
            method: 'get'
        })
    }
 
}