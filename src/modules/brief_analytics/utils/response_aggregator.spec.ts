import { mockObject } from '../../../../test/common-helpers'
import { PollResponse } from '../../../entities/poll_response.entity'
import { PollResponseOption } from '../../../entities/poll_response_option.entity'
import { AggregatedResponse } from '../dto'
import * as service from './response_aggregator'

describe('Response aggregator', () => {
  const response1: string = 'response 1'
  const response2: string = 'response 2'

  const pollResponse1: PollResponse = mockObject({ response: response1 })
  const pollResponse2: PollResponse = mockObject({ response: response1 })
  const pollResponse3: PollResponse = mockObject({ response: response2 })
  const responses: PollResponse[] = [pollResponse1, pollResponse2, pollResponse3]

  const responseOption1: PollResponseOption = mockObject({ option_value: response1 })
  const responseOption2: PollResponseOption = mockObject({ option_value: response2 })
  const responseOptions: PollResponseOption[] = [responseOption1, responseOption2]

  it('should aggregate multichoice poll responses', (): void => {
    const result: AggregatedResponse = service.aggregateMultiChoicePollResponses(responses, responseOptions)

    expect(result).toEqual({
      'response 1': 2,
      'response 2': 1,
    })
  })
})
