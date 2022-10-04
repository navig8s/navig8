export const readAsString = (buffer: ArrayBuffer) => {
  const decoder = new TextDecoder()

  return decoder.decode(buffer)
}
export const readAsJSON = (buffer: ArrayBuffer) => JSON.parse(readAsString(buffer))
