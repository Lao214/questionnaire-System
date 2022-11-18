// import api from '@/api'

const state = {
  status: 0,
  username: '',
  realname: '',
  advertid: 506,
  advertname: '问卷系统获取数据',
  device: ''
}

const getters = {
  status: state => state.status,
  username: state => state.username,
  realname: state => state.realname,
  advertid: state => state.advertid,
  advertname: state => state.advertname,
  device: state => state.device
}

const actions = {
  setName(context, name) {
    context.commit('SET_USERNAME', name)
  },
  setRealname(context, name) {
    context.commit('SET_REALNAME', name)
  },
  setDevice(context, device) {
    context.commit('SET_DEVICE', device)
  }
}

const mutations = {
  SET_STATUS: (state, status) => {
    state.status = status
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_REALNAME: (state, realname) => {
    state.realname = realname
  },
  SET_DEVICE: (state, device) => {
    state.device = device
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
