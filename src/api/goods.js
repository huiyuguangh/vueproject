import request from '@/utils/request'

export function getGoodsInfoList(param) {
  return request({
    url: '/goods/tGoods/getGoodsInfoList',
    method: 'post',
    data: request.qs.stringify(param)
  })
}

export function insertGoodsInfo(param) {
  return request({
    url: '/goods/tGoods/insertGoodsInfo',
    method: 'post',
    data: param
  })
}

export function uploadGoodsPhoto(param) {
  return request({
    url: '/goods/tGoods/uploadGoodsPhoto',
    method: 'post',
    data: param
  })
}

export function delGoodsInfoById(param) {
  return request({
    url: '/goods/tGoods/delGoodsInfoById',
    method: 'post',
    data: request.qs.stringify(param)
  })
}

export function getGoodsInfoById(param) {
  return request({
    url: '/goods/tGoods/getGoodsInfoById',
    method: 'post',
    data: request.qs.stringify(param)
  })
}

export function editGoodsInfo(param) {
  return request({
    url: '/goods/tGoods/editGoodsInfo',
    method: 'post',
    data: param
  })
}

