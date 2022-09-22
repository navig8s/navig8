import { handleServerError } from './ServerError'

export const request = (...params: Parameters<typeof fetch>) =>
  fetch(...params).then(handleServerError)
