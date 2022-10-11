import { request } from './request'
import { CORS_PROXY_URL } from '@/environment'

export const corsProxyRequest = (...params: Parameters<typeof request>) => {
  const [urlOrConfig, ...restParams] = params
  const newFirstParam =
    typeof urlOrConfig === 'string' || urlOrConfig instanceof URL
      ? CORS_PROXY_URL + urlOrConfig.toString()
      : { ...urlOrConfig, url: CORS_PROXY_URL + urlOrConfig.url }

  return request(newFirstParam, ...restParams)
}
