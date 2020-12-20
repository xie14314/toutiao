import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 获取router原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象上的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        component: () => import('@/views/video/')
      },
      {
        path: '/mine',
        component: () => import('@/views/mine/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
