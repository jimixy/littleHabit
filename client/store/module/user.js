import { login, logout } from '~/api/user'

// import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    token: ''
  },
  mutations: {
    setUserName(state, name) {
      state.userName = name
    },
    setToken(state, token) {
      state.token = token
    }
  },
  getters: {},
  actions: {
    // 登录
    handleLogin({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        })
          .then(res => {
            const data = res.data
            commit('setToken', data.token)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      // return new Promise((resolve, reject) => {
      //   logout(state.token)
      //     .then(() => {
      //       commit('setToken', '')
      //       commit('setAccess', [])
      //       resolve()
      //     })
      //     .catch(err => {
      //       reject(err)
      //     })
      //   // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
      //   // commit('setToken', '')
      //   // commit('setAccess', [])
      //   // resolve()
      // })
    },
  }
}
