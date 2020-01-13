import Layout from '@/layout'

export const generateInitRoutersMap = () => {
  return [
    {
      path: '/urolemanager',
      component: Layout,
      redirect: 'urolemanager/rolemanager',
      name: 'Urolemanager',
      meta: { title: '权限管理', icon: 'example', roles: ['super_admin'] },
      children: [
        {
          path: 'rolemanager',
          name: 'RoleManager',
          component: () => import('@/views/userRolemanager/role'),
          meta: { title: '角色管理', icon: 'role', roles: ['super_admin'] }
        },
        {
          path: 'userrolemanager',
          name: 'UserRoleManager',
          component: () => import('@/views/usermanager/userInfo'),
          meta: { title: '角色用户管理', icon: 'user', roles: ['super_admin'] }
        }
      ]
    },
    {
      path: '/goodsusermanager',
      component: Layout,
      name: 'goodsUserManager',
      meta: { title: '用户管理', icon: 'userManager', roles: ['user_admin'] },
      children: [
        {
          path: 'goodsuserinfo',
          name: 'goodsUserInfo',
          component: () => import('@/views/goodsUserManager/goodsUserInfo'),
          meta: { title: '用户信息管理', icon: 'user', roles: ['user_admin'] }
        },
        {
          path: 'shippingaddr',
          name: 'goodsShippingAddr',
          component: () => import('@/views/goodsUserManager/goodsShippingAddr'),
          meta: { title: '收货地址管理', icon: 'shippingAddr', roles: ['user_admin'] }
        },
        {
          path: 'buygoodsinfo',
          name: 'buyGoodsInfo',
          component: () => import('@/views/goodsUserManager/buyGoodsInfo'),
          meta: { title: '用户商品管理', icon: 'userGoods', roles: ['user_admin'] }
        }
      ]
    },
    {
      path: '/goodsmanager',
      component: Layout,
      name: 'GoodsManager',
      meta: { title: '商品管理', icon: 'goodsManager', roles: ['goods_admin'] },
      children: [
        {
          path: 'goodscategorymanager',
          name: 'goodsCategoryManager',
          component: () => import('@/views/goodsmanager/categoryinfo'),
          meta: { title: '商品分类管理', icon: 'goodCategory', roles: ['goods_admin'] }
        },
        {
          path: 'goodsinfo',
          name: 'goodsInfo',
          component: () => import('@/views/goodsmanager/goodsInfo'),
          meta: { title: '商品信息管理', icon: 'goodsInfo', roles: ['goods_admin'] }
        }
      ]
    }]
}

export default generateInitRoutersMap
