import { throwInline } from '@/utils/error'

export class RequestError extends Error {
  constructor(public code: number = 0, public response: Response) {
    super(response.statusText)
  }
}
export class CORSOrDroppedConnectionError extends Error {
  constructor() {
    super('CORS error occurred or connection was dropped')
  }
}

export const handleRequestError = (response: Response) => {
  if (!response.ok) throwInline(new RequestError(response.status, response))

  return response
}
