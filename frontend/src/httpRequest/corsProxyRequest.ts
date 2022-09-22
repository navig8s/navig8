import { request } from './request'

const PROXY_URL = 'http://localhost:9000/'

export const corsProxyRequest = (...params: Parameters<typeof request>) => {
  const [urlOrConfig, ...restParams] = params
  const newFirstParam =
    typeof urlOrConfig === 'string' || urlOrConfig instanceof URL
      ? PROXY_URL + urlOrConfig.toString()
      : { ...urlOrConfig, url: PROXY_URL + urlOrConfig.url }

  return request(newFirstParam, ...restParams)
}
