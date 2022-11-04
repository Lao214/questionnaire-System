import request from '@/utils/request'

export default{
    postFormData(formvo) {
        return request({
            url: '/webApi/formData/postFormData',
            method: 'post',
            data:formvo
        })
    }
}