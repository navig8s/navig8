import { RemoteData } from './RemoteData'
import { ref } from 'vue'

export const useRequest = <P, E, T>(request: (payload: P) => Promise<T>) => {
  const remoteData = ref(new RemoteData<E, T>())

  const performRequest = (payload: P) => {
    remoteData.value.pending()

    request(payload).then(
      (data) => remoteData.value.fulfilled(data),
      (error: E) => remoteData.value.rejected(error),
    )
  }

  return { data: remoteData, request: performRequest }
}
