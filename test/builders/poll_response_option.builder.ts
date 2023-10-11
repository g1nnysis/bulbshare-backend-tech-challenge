import { DeepPartial } from 'typeorm'
import { PollResponseOption } from '../../src/entities/poll_response_option.entity'

export function buildPollResponseOption(overrides: DeepPartial<PollResponseOption> = {}): DeepPartial<PollResponseOption> {
  const option: DeepPartial<PollResponseOption> = {
    id: 1,
    poll_item_id: 1,
    option_value: 'a',
    content: 'Test response.',
    ...overrides,
  }

  return option
}
