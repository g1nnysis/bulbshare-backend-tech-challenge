import { PollResponse } from '../../../entities/poll_response.entity'
import { PollResponseOption } from '../../../entities/poll_response_option.entity'
import { AggregatedResponse } from '../dto'

export function aggregateMultiChoicePollResponses(responses: PollResponse[], responseOptions: PollResponseOption[]): AggregatedResponse {
  const responseOptionsMap: Map<number, string> = new Map()

  responseOptions.forEach(option => {
    responseOptionsMap.set(option.id, option.option_value)
  })

  const aggregatedResponses: AggregatedResponse = {}

  responses.forEach(response => {
    const optionId = response.response_option_id

    if (responseOptionsMap.has(optionId)) {
      const optionValue = responseOptionsMap.get(optionId)

      aggregatedResponses[optionValue] = (aggregatedResponses[optionValue] || 0) + 1
    }
  })

  return aggregatedResponses
}
