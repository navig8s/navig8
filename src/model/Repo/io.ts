import { JsonDecoder } from 'ts.data.json'
import { ChartManifest, EntryManifest } from './types'
import { arrayNotEmptyDecoder } from '@/decoder'

export const entryManifestDecoder = JsonDecoder.object<EntryManifest>(
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
    icon: JsonDecoder.optional(JsonDecoder.string),
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

const versionDecoder = JsonDecoder.oneOf<string | number>(
  [JsonDecoder.string, JsonDecoder.number],
  'version',
)

export const chartDecoder = JsonDecoder.object<ChartManifest>(
  {
    name: JsonDecoder.string,
    version: versionDecoder,
    kubeVersion: JsonDecoder.optional(versionDecoder),
    description: JsonDecoder.optional(JsonDecoder.string),
  },
  'chart',
)
