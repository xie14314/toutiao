import axios from 'axios'
import store from '../store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 添加请求拦截器
request.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    const { userInfo } = store.state
    // 如果用户处于登录状态
    if (userInfo) {
      // 设置请求头
      config.headers.Authorization = `Bearer ${userInfo.token}`
    }
    // 放行
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
