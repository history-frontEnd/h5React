import { dbPrefix as prefix } from 'utils/config'

export const get = (key) => {
  return localStorage.getItem(prefix + key)
}

export const set = (key, value) => {
  localStorage.setItem(prefix + key, value)
}

export const remove = (key) => {
  localStorage.removeItem(prefix + key)
}

export const clear = () => {
  localStorage.clear()
}

export const getObj = (objKey, valueKey) => {
  let data = get(objKey) && JSON.parse(get(objKey)) || ''
  return (valueKey === undefined && data) || (data && data[valueKey]) || ''
}

export const setObj = (objKey, obj) => {
  set(objKey, JSON.stringify(obj))
}

export const removeObj = (objKey, valueKey) => {
  if (valueKey) {
    let obj = getObj(objKey)
    delete obj[valueKey]
    setObj(objKey, obj)
  } else {
    remove(prefix + objKey)
  }
}

export const updateObj = (objKey, key, value) => {
  let obj = getObj(objKey)
  obj[key] = value
  setObj(objKey, obj)
}

// db.setUser({name: 'aaa'}) 设置整个user
// db.setUser('age', 12) 设置key
export const setUser = (userDataOrKey, value) => {
  if (value) {
    updateObj('user', userDataOrKey, value)
  } else {
    setObj('user', userDataOrKey)
  }
}

// db.getUser() 获取整个user
// db.getUser('name') 获取key
export const getUser = (valueKey) => {
  return getObj('user', valueKey)
}

// db.removeUser() 删除user
// db.removeUser('name') 删除user一个key
export const removeUser = (valueKey) => {
  removeObj('user', valueKey)
}

export const updateUser = (key, value) => {
  updateObj('user', key, value)
}

export default {
  set,
  get,
  remove,
  clear,
  setObj,
  getObj,
  removeObj,
  setUser,
  getUser,
  removeUser
}
