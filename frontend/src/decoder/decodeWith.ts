import { JsonDecoder } from 'ts.data.json'
import { DecodeError } from '@/decoder/error'
import { throwInline } from '@/utils/error'

type ErrorGetter<T> = (message: string, decoder: JsonDecoder.Decoder<T>) => DecodeError<T>

export const decodeWith =
  <T>(
    decoder: JsonDecoder.Decoder<T>,
    getError: ErrorGetter<T> = (message, decoder) => new DecodeError(message, decoder),
  ) =>
  (json: any) =>
    decoder.decodeToPromise(json).catch((message) => throwInline(getError(message, decoder)))
