import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/tLoginUser/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/tLoginUser/getInfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/tLoginUser/logout',
    method: 'post'
  })
}

export function getAllUserInfo() {
  return request({
    url: '/user/tLoginUser/getAllUserInfo',
    method: 'post'
  })
}

export function addUser(param) {
  return request({
    url: '/user/tLoginUser/addUser',
    method: 'post',
    data: param
  })
}

export function delUserById(param) {
  return request({
    url: '/user/tLoginUser/delUser',
    method: 'post',
    data: request.qs.stringify(param)
  })
}

export function getUserInfoById(param) {
  return request({
    url: '/user/tLoginUser/getUserInfoById',
    method: 'post',
    data: request.qs.stringify(param)
  })
}

export function editUser(param) {
  return request({
    url: '/user/tLoginUser/editUser',
    method: 'post',
    data: param
  })
}
