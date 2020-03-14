import request from '@/utils/request'

export function getGoodsTypeList() {
  return request({
    url: '/goods/tGoodsType/getGoodsTypeListByParam',
    method: 'post'
  })
}

export function getGoodsType() {
  return request({
    url: '/goods/tGoodsType/getGoodsType',
    method: 'post'
  })
}


export function addGoodsType(param) {
  return request({
    url: '/goods/tGoodsType/insertGoodsType',
    method: 'post',
    data: param
  })
}

export function getGoodsCateTypeById(param) {
  return request({
    url: '/goods/tGoodsType/getGoodsTypesById',
    method: 'post',
    data: request.qs.stringify(param)
  })
}

export function editGoodstype(param) {
  return request({
    url: '/goods/tGoodsType/editGoodsType',
    method: 'post',
    data: param
  })
}

export function delGoodsTypeById(param) {
  return request({
    url: '/goods/tGoodsType/delGoodsTypeById',
    method: 'post',
    data: request.qs.stringify(param)
  })
}
