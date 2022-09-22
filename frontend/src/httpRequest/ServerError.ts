import { throwInline } from '@/utils/error'

export class ServerError extends Error {
  constructor(private code: number = 0, private response: Response) {
    super(response.statusText)
  }
}

export const handleServerError = (response: Response) => {
  if (!response.ok) throwInline(new ServerError(response.status, response))

  return response
}
