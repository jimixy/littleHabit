/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const setLocal = (key, val) => {
  if(typeof val==='string'){
    localStorage.setItem(key, val)
  }else{
    localStorage.setItem(key, JSON.stringify(val))
  }
}

export const getLocal = key => {
  // 如果不是客服端，直接退出
  if(!window) return null;
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.log(error)
  }
}

export const delLocal = key => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.log(error)
  }
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}
