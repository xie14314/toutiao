import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)
const USER_KEY = 'toutiao_user'
const CURRENT_USER = 'current_user'
export default new Vuex.Store({
  state: {
    userInfo: getItem(USER_KEY),
    currentUser: getItem(CURRENT_USER)
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
      setItem(USER_KEY, data)
    },
    setCurrentUser(state, data) {
      state.currentUser = data
      setItem(CURRENT_USER, data)
    }
  },
  actions: {},
  modules: {}
})
