import { PollItem } from '../../src/entities/poll_item.entity'
import { PollItemType } from '../../src/common/enums'
import { DeepPartial } from 'typeorm'

export function buildPollItem(overrides: DeepPartial<PollItem> = {}): DeepPartial<PollItem> {
  const item: DeepPartial<PollItem> = {
    id: 1,
    brief_id: 1,
    type: PollItemType.OpenText,
    question: 'Test question?',
    ...overrides,
  }

  return item
}
