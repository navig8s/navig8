import { JsonDecoder, ok, err } from 'ts.data.json'
import { EntryManifest } from './types'
import { tryCatch, always } from 'ramda'

const arrayNotEmptyDecoder = <T extends unknown[], NE = NonEmptyArray<T[number]>>() =>
  new JsonDecoder.Decoder<NE>(
    tryCatch((json: any) => {
      if (json.length > 0) return ok<NE>(json)

      throw void 0
    }, always(err<NE>('Array must be not empty'))),
  )

export const chartManifestDecoder = JsonDecoder.object<EntryManifest>(
  {
    apiVersion: JsonDecoder.string,
    created: JsonDecoder.string,
    description: JsonDecoder.string,
    digest: JsonDecoder.string,
    name: JsonDecoder.string,
    urls: JsonDecoder.allOf(
      JsonDecoder.array(JsonDecoder.string, 'urls'),
      arrayNotEmptyDecoder<string[]>(),
    ),
    version: JsonDecoder.string,
  },
  'entry',
)

export const repoManifestDecoder = <T extends string>(entry: T) =>
  JsonDecoder.object(
    {
      apiVersion: JsonDecoder.string,
      // @ts-ignore
      entries: JsonDecoder.object({ [entry]: arrayNotEmptyDecoder() }, 'entries'),
    },
    'repoManifest',
  )
