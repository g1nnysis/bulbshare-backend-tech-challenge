import { Test, TestingModule } from '@nestjs/testing'
import { BriefAnalyticsService } from './brief_analytics.service'
import { Provider } from '@nestjs/common'
import { PollResponseTypeOrmRepository } from '../../repositories/poll_response.repository'
import { PollItemTypeOrmRepository } from '../../repositories/poll_item.repository'
import { PollResponseOptionTypeOrmRepository } from '../../repositories/poll_response_option.repository'
import { when } from 'jest-when'
import { mockObject } from '../../../test/common-helpers'
import { PollItem } from '../../entities/poll_item.entity'
import { PollResponse } from '../../entities/poll_response.entity'
import { PollResponseOption } from '../../entities/poll_response_option.entity'
import * as responseAggregator from './utils/response_aggregator'
import * as completionTimeCalculator from './utils/completion_time_calculator'
import { AggregatedResponse } from './dto'
import { PollItemType } from '../../common/enums'

describe('BriefAnalyticsService', () => {
  let service: BriefAnalyticsService
  let pollResponseRepository: PollResponseTypeOrmRepository
  let pollItemRepository: PollItemTypeOrmRepository
  let pollResponseOptionRepository: PollResponseOptionTypeOrmRepository

  const pollResponseRepositoryProvider: Provider = {
    provide: PollResponseTypeOrmRepository,
    useFactory: (): unknown => ({
      getPollResponsesByCriteria: jest.fn(),
    }),
  }

  const pollItemRepositoryProvider: Provider = {
    provide: PollItemTypeOrmRepository,
    useFactory: (): unknown => ({
      getPollItemResponsesByBriefId: jest.fn(),
      getById: jest.fn()
    }),
  }

  const pollResponseOptionProvider: Provider = {
    provide: PollResponseOptionTypeOrmRepository,
    useFactory: (): unknown => ({
      getByPollItemId: jest.fn(),
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BriefAnalyticsService, pollResponseRepositoryProvider, pollItemRepositoryProvider, pollResponseOptionProvider],
    }).compile()

    service = module.get<BriefAnalyticsService>(BriefAnalyticsService)
    pollResponseRepository = module.get<PollResponseTypeOrmRepository>(PollResponseTypeOrmRepository)
    pollResponseOptionRepository = module.get<PollResponseOptionTypeOrmRepository>(PollResponseOptionTypeOrmRepository)
    pollItemRepository = module.get<PollItemTypeOrmRepository>(PollItemTypeOrmRepository)

  })

  describe('aggregateMultiChoiceResponses', () => {
    it('should return aggregated responses', async () => {
      const pollItemId = 1
      const filterCriteria = { age: [18, 35], gender: ['male'], country: [1, 2] }
      const pollItem: PollItem = mockObject({ type: PollItemType.MultiChoice })
      const responses: PollResponse[] = [mockObject()]
      const responseOptions: PollResponseOption[] = [mockObject()]
      const expectedResult: AggregatedResponse = mockObject()

      const getById: jest.SpyInstance = jest.spyOn(pollItemRepository, 'getById')
      const getByPollItemId: jest.SpyInstance = jest.spyOn(pollResponseOptionRepository, 'getByPollItemId')
      const getPollResponsesByCriteria: jest.SpyInstance = jest.spyOn(pollResponseRepository, 'getPollResponsesByCriteria')
      const aggregateMultiChoicePollResponses: jest.SpyInstance = jest.spyOn(responseAggregator, 'aggregateMultiChoicePollResponses')

      when(getById).expectCalledWith(pollItemId).mockReturnValueOnce(pollItem)
      when(getPollResponsesByCriteria).expectCalledWith(pollItemId, filterCriteria).mockReturnValueOnce(responses)
      when(getByPollItemId).expectCalledWith(pollItemId).mockReturnValueOnce(responseOptions)
      when(aggregateMultiChoicePollResponses).expectCalledWith(responses, responseOptions).mockReturnValueOnce(expectedResult)

      const result = await service.aggregateMultiChoiceResponses(pollItemId, filterCriteria)

      expect(result).toEqual(expectedResult)
    })
  })

  describe('calculateAverageCompletionTime', () => {
    it('should return average completion time', async () => {
      const briefId = 1
      const pollItem: PollItem = mockObject()

      const getPollItemResponsesByBriefId: jest.SpyInstance = jest.spyOn(pollItemRepository, 'getPollItemResponsesByBriefId')
      const calculateAverageCompletionTime: jest.SpyInstance = jest.spyOn(completionTimeCalculator, 'calculateAverageCompletionTime')

      when(getPollItemResponsesByBriefId).expectCalledWith(briefId).mockReturnValueOnce(pollItem)
      when(calculateAverageCompletionTime).expectCalledWith(pollItem).mockReturnValueOnce(1)

      const result = await service.calculateAverageBriefCompletionTime(briefId)

      expect(result).toEqual(1)
    })
  })
})
