export const throwInline = <T extends unknown>(error?: T) => {
  throw error ?? new Error()
}
