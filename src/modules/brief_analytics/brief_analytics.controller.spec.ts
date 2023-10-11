import { Test, TestingModule } from '@nestjs/testing'
import { BriefAnalyticsController } from './brief_analytics.controller'
import { BriefAnalyticsService } from './brief_analytics.service'
import { Provider } from '@nestjs/common'
import { mockObject } from '../../../test/common-helpers'
import { FilterCriteria } from './schema'

describe('BriefAnalyticsController', () => {
  let controller: BriefAnalyticsController
  let service: BriefAnalyticsService

  const serviceProvider: Provider = {
    provide: BriefAnalyticsService,
    useFactory: (): unknown => ({
      aggregateMultiChoiceResponses: jest.fn(),
      calculateAverageBriefCompletionTime: jest.fn(),
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BriefAnalyticsController],
      providers: [serviceProvider],
    }).compile()

    controller = module.get<BriefAnalyticsController>(BriefAnalyticsController)
    service = module.get<BriefAnalyticsService>(BriefAnalyticsService)
  })

  describe('aggregateMultiChoice', () => {
    it('should call service method with correct parameters', async () => {
      const pollItemId = 1
      const filterCriteria: FilterCriteria = mockObject()

      const aggregateMultiChoiceResponsesSpy = jest.spyOn(service, 'aggregateMultiChoiceResponses')

      await controller.aggregateMultiChoice(pollItemId, filterCriteria)

      expect(aggregateMultiChoiceResponsesSpy).toHaveBeenCalledWith(pollItemId, filterCriteria)
    })
  })

  describe('calculateAverageCompletion', () => {
    it('should call service method with correct parameters', async () => {
      const briefId = 1

      const calculateAverageCompletionTimeSpy = jest.spyOn(service, 'calculateAverageBriefCompletionTime')

      await controller.calculateAverageCompletion(briefId)

      expect(calculateAverageCompletionTimeSpy).toHaveBeenCalledWith(briefId)
    })
  })
})
