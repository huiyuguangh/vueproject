import Layout from '@/layout'

export const generateInitRoutersMap = () => {
  return [
    {
      path: '/urolemanager',
      component: Layout,
      redirect: 'noRedirect',
      name: 'Urolemanager',
      meta: { title: '权限管理', icon: 'example', roles: ['super_admin'] },
      children: [
        {
          path: 'rolemanager',
          name: 'RoleManager',
          component: () => import('@/views/userRolemanager/role'),
          meta: { title: '角色列表', icon: 'role', roles: ['super_admin'] }
        },
        {
          path: 'usermanager',
          name: 'UserManager',
          component: () => import('@/views/usermanager/userInfo'),
          meta: { title: '登录用户列表', icon: 'user', roles: ['super_admin'] }
        }
      ]
    },
    {
      path: '/usermanager',
      component: Layout,
      redirect: 'noRedirect',
      name: 'userManager',
      meta: { title: '用户管理', icon: 'example', roles: ['user_admin'] },
      children: [
        {
          path: 'userinfo',
          name: 'userinfo',
          component: () => import('@/views/userRolemanager/role'),
          meta: { title: '用户信息', icon: 'buyuser', roles: ['user_admin'] }
        }
      ]
    }]
}

export default generateInitRoutersMap
