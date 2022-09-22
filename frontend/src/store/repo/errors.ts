export class FileNotFoundError extends Error {
  constructor(fileName: string) {
    super(`Required file "${fileName}" was not found for the specified helm chart`)
  }
}
