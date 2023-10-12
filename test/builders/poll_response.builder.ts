import { DeepPartial } from 'typeorm'
import { PollResponse } from '../../src/entities/poll_response.entity'

export function buildPollResponse(overrides: DeepPartial<PollResponse> = {}): DeepPartial<PollResponse> {
  const response: DeepPartial<PollResponse> = {
    id: 1,
    user_id: 1,
    poll_item_id: 1,
    content: 'Test response.',
    response_option_id: null,
    brief_id: 1,
    start_time: new Date(),
    end_time: new Date(),
    ...overrides,
  }

  return response
}
