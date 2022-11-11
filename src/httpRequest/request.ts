import { CORSOrDroppedConnectionError, handleRequestError } from './RequestError'
import { throwInline } from '@/utils/error'

export const request = (...params: Parameters<typeof fetch>) =>
  fetch(...params).then(handleRequestError, () => throwInline(new CORSOrDroppedConnectionError()))
