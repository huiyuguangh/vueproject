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

