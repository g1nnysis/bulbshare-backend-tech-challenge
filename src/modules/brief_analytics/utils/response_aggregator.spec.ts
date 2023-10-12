import { mockObject } from '../../../../test/common-helpers'
import { PollResponse } from '../../../entities/poll_response.entity'
import { PollResponseOption } from '../../../entities/poll_response_option.entity'
import { AggregatedResponse } from '../interfaces/dto'
import * as service from './response_aggregator'

describe('Response aggregator', () => {
  const pollResponse1: PollResponse = mockObject({ response_option_id: 1 })
  const pollResponse2: PollResponse = mockObject({ response_option_id: 1 })
  const pollResponse3: PollResponse = mockObject({ response_option_id: 2 })
  const responses: PollResponse[] = [pollResponse1, pollResponse2, pollResponse3]

  const responseOption1: PollResponseOption = mockObject({ option_value: 'a', id: 1 })
  const responseOption2: PollResponseOption = mockObject({ option_value: 'b', id: 2 })
  const responseOptions: PollResponseOption[] = [responseOption1, responseOption2]

  it('should aggregate multichoice poll responses', (): void => {
    const result: AggregatedResponse = service.aggregateMultiChoicePollResponses(responses, responseOptions)

    expect(result).toEqual({
      a: 2,
      b: 1,
    })
  })
})
