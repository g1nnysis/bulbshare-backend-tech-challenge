import { mockObject } from '../../../../test/common-helpers'
import { PollItem } from '../../../entities/poll_item.entity'
import { PollResponse } from '../../../entities/poll_response.entity'
import * as service from './completion_time_calculator'

describe('Completion time calculator', () => {
  const now: Date = new Date()
  const startTime: Date = new Date(now.getTime())
  const endTime1: Date = new Date(now.getTime() + 1000)
  const endTime2: Date = new Date(now.getTime() + 2000)

  const userId1: number = 1
  const userId2: number = 2

  const pollResponse1: PollResponse = mockObject({ start_time: startTime, end_time: endTime1, user_id: userId1 })
  const pollResponse2: PollResponse = mockObject({ start_time: startTime, end_time: endTime2, user_id: userId1 })
  const pollResponse3: PollResponse = mockObject({ start_time: startTime, end_time: endTime1, user_id: userId2 })

  const pollItem1: PollItem = mockObject({ pollResponses: [pollResponse1, pollResponse3] })
  const pollItem2: PollItem = mockObject({ pollResponses: [pollResponse2] })

  it('should calculate average completion time for all poll items on a brief', (): void => {
    const result: number = service.calculateAverageCompletionTime([pollItem1, pollItem2])

    expect(result).toEqual(2000)
  })

  it('should handle 0 responses for a brief', (): void => {
    const result: number = service.calculateAverageCompletionTime([mockObject(), mockObject()])

    expect(result).toEqual(0)
  })
})
