import request, { req } from '../../utils/request'
export async function pay (params) {
  return request({
    url: `/khaos/pay`,
    method: 'POST',
    params
  })
}

export async function login (params) {
  return request({
    mock: true,
    url: `/khaos/openlogin`,
    method: 'POST',
    params
  })
}

// https://api-saas.biosan.cn/khaos/getOrderDetail?order_id=b408805d0d16498798b6df200a5ce30d&biz_type=dover&usertoken=0B4E45F30E7AD5803ED4ADB2B97DF92B&originType=miniprogram
export async function getOrderDetail (params) {
  return req({
    mock: true,
    url: `/khaos/getOrderDetail`,
    method: 'GET',
    params
  })
}
