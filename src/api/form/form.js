import request from '@/utils/request'

export default{
    // 1 讲师列表（条件分页查询）
    // current 当前页 limit 每页记录数  teacherQuery条件
    getFormList(current,limit,formQuery){
        return request({
            url: '/webApi/form/queryFormListPage/'+current+"/"+limit,
            method: 'post',
            //formQuery 条件对象，后端用requestBody获取数据 需要用data
            //data 表示 把对象转换成了json然后进行传递到接口。
            data:formQuery
          })
    },
    getFormItemById(id) {
        return request({
            url: '/webApi/formItem/getFormItemByFormId/'+id,
            method: 'get',
        })
    },
    addForm(formvo) {
        return request({
            url: '/webApi/form/addForm',
            method: 'post',
            data:formvo
        })
    },
    update(formvo) {
        return request({
            url: '/webApi/form/update',
            method: 'post',
            data:formvo
        })
    },
    updateFormItem(formvo) {
        return request({
            url: '/webApi/formItem/updateFormItem',
            method: 'post',
            data:formvo
        })
    },
    publish(id) {
        return request({
            url: '/webApi/form/publish/'+id,
            method: 'post'
        })
    },
    getFormById(id) {
        return request({
            url: '/webApi/form/getByFormId/'+id,
            method: 'get'
        })
    }
}