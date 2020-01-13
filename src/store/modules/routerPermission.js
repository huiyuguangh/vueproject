import { constantRoutes } from '@/router'
import { generateInitRoutersMap } from '@/router/asyncRouterMap'

const state = {
  routers: constantRoutes,
  asAddRouter: []
}
const mutations = {
  SET_ROUTERS(state, routers) {
    state.asAddRouter = routers
    state.routers = constantRoutes.concat(routers).concat({ path: '*', redirect: '/404', hidden: true })
  }
}
const actions = {
  getGenRouter({ commit }, roles) {
    return new Promise((resolve, reject) => {
      const newRouterMap = generateInitRoutersMap()
      // console.log('newRouterMap', newRouterMap)
      const filterrouter = filterAsyncRouters(newRouterMap, roles)
      // console.log('filterrouter', filterrouter)
      commit('SET_ROUTERS', filterrouter)
      resolve()
    })
  }
}

const filterAsyncRouters = (newRouterMap, roles) => {
  const newasycrouter = newRouterMap.filter(router => {
    if (hasPermission(roles, router)) {
      if (router.children && router.children.length) {
        router.children = filterAsyncRouters(router.children, roles)
      }
      return true
    }
    return false
  })
  return newasycrouter
}

const hasPermission = (roles, router) => {
  if (router.meta && router.meta.roles) {
    return roles.some(role => {
      return router.meta.roles.indexOf(role) >= 0
    })
  } else {
    return true
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

