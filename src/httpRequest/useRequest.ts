import { Transaction } from '@/utils/Transaction'
import { readonly, shallowRef } from 'vue'

export const useRequest = <P, E, T>(request: (payload: P) => Promise<T>) => {
  const remoteData = shallowRef(new Transaction<E, T>())
  const readonlyProxy = readonly(remoteData)

  const performRequest = (payload: P) => {
    // IIFE to make this method just an effect trigger
    ;(async () => {
      remoteData.value = remoteData.value.toPending()

      remoteData.value = await request(payload).then(
        (data) => remoteData.value.toFulfilled(data),
        (error: E) => remoteData.value.toRejected(error),
      )
    })()
  }

  return { data: readonlyProxy, request: performRequest }
}
