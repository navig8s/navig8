import { formStructureFromSchema } from '../../model'
import { FormConstructionError } from '../../error'

describe('Invalid form construction from schema', () => {
  it('should throw "FormConstructionError" when the top level node of the schema is not an object', () => {
    expect(() => formStructureFromSchema({ type: 'string' }, {})).toThrow(FormConstructionError)
    expect(() => formStructureFromSchema({ type: 'integer' }, {})).toThrow(FormConstructionError)
    expect(() => formStructureFromSchema({ type: 'number' }, {})).toThrow(FormConstructionError)
    expect(() => formStructureFromSchema({ type: 'array', items: { type: 'string' } }, {})).toThrow(
      FormConstructionError,
    )
    expect(() => formStructureFromSchema({ type: 'array' }, {})).toThrow(FormConstructionError)
    expect(() => formStructureFromSchema({ type: ['array'] }, {})).toThrow(FormConstructionError)
    expect(() => formStructureFromSchema({ type: [] }, {})).toThrow(FormConstructionError)
  })
})
