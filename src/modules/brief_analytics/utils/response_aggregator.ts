import { PollResponse } from '../../../entities/poll_response.entity'
import { PollResponseOption } from '../../../entities/poll_response_option.entity'
import { AggregatedResponse } from '../dto'

export function aggregateMultiChoicePollResponses(responses: PollResponse[], responseOptions: PollResponseOption[]): AggregatedResponse {
  const aggregatedResponses: AggregatedResponse = {}

  responses.forEach(response => {
    const optionValue = response.response
    if (responseOptions.some(responseOption => responseOption.option_value === optionValue)) {
      aggregatedResponses[optionValue] = (aggregatedResponses[optionValue] || 0) + 1
    }
  })

  return aggregatedResponses
}
