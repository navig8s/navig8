declare module 'js-untar' {
  /*
   * Docs ref https://github.com/InvokIT/js-untar#file-object
   * Properties https://github.com/InvokIT/js-untar/blob/master/src/untar-worker.js#L264-L295
   * Methods https://github.com/InvokIT/js-untar/blob/master/src/untar.js#L63-L97
   * */
  export type FileResponse = {
    buffer: ArrayBuffer
    name: string
    mode: string
    uid: string
    gid: string
    size: string
    mtime: string
    checksum: string
    type: string
    linkname: string
    ustarFormat: string

    get blob(): Blob
    getBlobUrl(): string
    readAsString(): string
    readAsJSON(): ReturnType<typeof JSON.parse>
  }

  function untar(buffer: ArrayBuffer): Promise<FileResponse[]>

  export default untar
}

type NonEmptyArray<T> = [T, ...T[]]

type Nullable<T> = T | null
