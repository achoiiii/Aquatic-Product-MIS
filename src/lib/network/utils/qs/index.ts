/**
 * 获取 url 上的 search 参数值
 * @param {string} key - 参数名
 * @param {string} url - 被查找的 url，默认为当前的 location
 */
export function getQuery(key, url?) {
  url = url || location.search;
  const hashIndex = url.indexOf('#');
  if (hashIndex > 0) {
    url = url.substr(0, hashIndex);
  }
  const keyMatches = url.match(new RegExp(`[?|&]${encodeURIComponent(key)}=([^&]*)(&|$)`));
  if (keyMatches && keyMatches[1] === '%s') {
    return keyMatches[1];
  } else {
    return keyMatches ? decodeURIComponent(keyMatches[1]) : '';
  }
}

export function getParamsStr(data = {}) {
  const stack: string[] = [];
  Object.keys(data).forEach((key) => {
    const value = data[key];
    stack.push(`${encodeURIComponent(key)}=${encodeURIComponent(value === undefined ? '' : value)}`);
  });
  const query = stack.join('&').replace(/%20/g, '+');

  return query;
}
/**
 * 设置增加url的参数
 * @param url 标准的url
 * @param Params 追加的query
 * @return {string}
 */

export function setUrlParams(url, Params = {}) {
  url = new URL(url);
  for (const key in Params) {
    if (Params[key]) url.searchParams.set(key, Params[key]);
  }
  return url.toString();
}
export default {
  getQuery,
  getParamsStr,
  setUrlParams,
};
