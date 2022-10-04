import { JsonDecoder } from 'ts.data.json'
import { DecodeError } from '@/decoder/error'
import { throwInline } from '@/utils/error'

export const decodeWith =
  <T>(decoder: JsonDecoder.Decoder<T>) =>
  (json: any) =>
    decoder.decodeToPromise(json).catch((message) => throwInline(new DecodeError(message, decoder)))
