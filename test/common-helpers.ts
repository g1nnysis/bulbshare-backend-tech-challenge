import { v4 } from 'uuid'
import * as _ from 'lodash'

export function mockObject<T, D extends Partial<T> = Partial<T>>(defaults?: D): T {
  return forceMockObject(defaults ?? {})
}

export function forceMockObject<T>(defaults: unknown): T {
  if (_.isEmpty(defaults)) {
    return <T>(<unknown>{ __mock_id: v4() })
  }

  return <T>defaults
}
