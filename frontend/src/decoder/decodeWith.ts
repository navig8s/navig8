import { JsonDecoder } from 'ts.data.json'
import { DecodeError } from '@/decoder/error'
import { throwInline } from '@/utils/error'

export const decodeWith =
  <T>(
    decoder: JsonDecoder.Decoder<T>,
    ErrorConstructor: new (message: string, decoder: JsonDecoder.Decoder<T>) => DecodeError<T>,
  ) =>
  (json: any) =>
    decoder
      .decodeToPromise(json)
      .catch((message) => throwInline(new ErrorConstructor(message, decoder)))
