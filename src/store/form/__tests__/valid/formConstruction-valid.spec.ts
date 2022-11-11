import { formStructureFromSchema } from '../../model'
import { validSchema, validYamlValues } from './validSchema'
import { validForm } from './validForm'

describe('Valid form construction from schema', () => {
  it('should correctly construct a form from schema', () => {
    expect(formStructureFromSchema(validSchema, validYamlValues)).toEqual(validForm)
  })
})
