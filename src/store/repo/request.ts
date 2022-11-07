import { USE_PROXY, REPO_URL } from '@/environment'
import { request as httpRequest } from '@/httpRequest/request'

export const request = (url: string) =>
  httpRequest((USE_PROXY ? '/repo' : REPO_URL.replace(/\/$/, '')) + url)
