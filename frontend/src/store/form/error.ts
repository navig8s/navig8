export class FormConstructionError extends Error {
  constructor() {
    super('Unexpected output from the form constructor')
  }
}
