import { JsonDecoder } from 'ts.data.json'

export class DecodeError<T> extends Error {
  constructor(msg: string, public decoder: JsonDecoder.Decoder<T>) {
    super(msg)
  }
}
