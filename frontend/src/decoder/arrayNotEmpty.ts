import { err, JsonDecoder, ok } from 'ts.data.json'
import { always, tryCatch } from 'ramda'

export const arrayNotEmptyDecoder = <T extends unknown[], NE = NonEmptyArray<T[number]>>() =>
  new JsonDecoder.Decoder<NE>(
    tryCatch((json: any) => {
      if (json.length > 0) return ok<NE>(json)

      throw void 0
    }, always(err<NE>('Array must be not empty'))),
  )
