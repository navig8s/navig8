export const throwInline = <T extends unknown>(error?: T) => {
  throw error === undefined ? error : new Error()
}
