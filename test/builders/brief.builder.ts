import { Brief } from '../../src/entities/brief.entity'
import { DeepPartial } from 'typeorm'

export function buildBrief(overrides: DeepPartial<Brief> = {}): DeepPartial<Brief> {
  const brief: DeepPartial<Brief> = {
    id: 1,
    parent_brief_id: null,
    ...overrides,
  }

  return brief
}
