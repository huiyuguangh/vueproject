import request from '@/utils/request'

export function getAllRoleList() {
  return request({
    url: '/user/tRole/getAllRoleList',
    method: 'post'
  })
}

export function getUserRoleList() {
  return request({
    url: '/user/tRole/getUserRoleList',
    method: 'post'
  })
}

export function addRole(param) {
  return request({
    url: '/user/tRole/addRole',
    method: 'post',
    data: param
  })
}

export function delRoleById(param) {
  return request({
    url: 'user/tRole/delRoleById',
    method: 'post',
    data: request.qs.stringify(param)
  })
}

export function editRoleById(param) {
  return request({
    url: 'user/tRole/editRoleById',
    method: 'post',
    data: param
  })
}
