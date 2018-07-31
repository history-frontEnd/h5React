import {req} from '../../utils/request'

export async function verifyMobileCode (params) {
  return req({
    url: `/khaos/verifycode`,
    method: 'POST',
    params
  })
}

export async function getCode (params) {
  return req({
    url: `/khaos/getverifycode`,
    method: 'POST',
    params
  })
}

export async function submitFormData (params) {
  return req({
    url: `/khaos/towerPlaceOrder`,
    method: 'POST',
    params
  })
}

export async function queryAreaTree (params) {
  return req({
    url: `/khaos/queryAreaTree?parent_code=${params.parent_code}`,
    method: 'GET'
  })
}
