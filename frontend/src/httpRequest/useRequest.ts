import { RemoteData } from './RemoteData'
import { shallowRef } from 'vue'

export const useRequest = <P, E, T>(request: (payload: P) => Promise<T>) => {
  const remoteData = shallowRef(new RemoteData<E, T>())

  const performRequest = async (payload: P) => {
    remoteData.value = remoteData.value.pending()

    remoteData.value = await request(payload).then(
      (data) => remoteData.value.fulfilled(data),
      (error: E) => remoteData.value.rejected(error),
    )
  }

  return { data: remoteData, request: performRequest }
}
