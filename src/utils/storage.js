/**
 * 存储模块
 */

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 尝试将data转换为对象
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
