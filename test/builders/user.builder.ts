import { DeepPartial } from 'typeorm'
import { User } from '../../src/entities/user.entity'

export function buildUser(overrides: DeepPartial<User> = {}): DeepPartial<User> {
  const option: DeepPartial<User> = {
    id: 1,
    age: 20,
    gender: 'female',
    country_id: 1,
    ...overrides,
  }

  return option
}
