import { Test, TestingModule } from '@nestjs/testing'
import { BriefAnalyticsService } from './brief_analytics.service'

describe('BriefAnalyticsService', () => {
  let service: BriefAnalyticsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BriefAnalyticsService],
    }).compile()

    service = module.get<BriefAnalyticsService>(BriefAnalyticsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('aggregateMultiChoiceResponses', () => {
    it('should return aggregated responses', async () => {
      const pollItemId = 1
      const filterCriteria = { age: [18, 35], gender: ['male'], country: [1, 2] }

      const result = await service.aggregateMultiChoiceResponses(pollItemId, filterCriteria)

      expect(result).toEqual({})
    })
  })

  describe('calculateAverageCompletionTime', () => {
    it('should return average completion time', async () => {
      const briefId = 1

      const result = await service.calculateAverageCompletionTime(briefId)

      expect(result).toEqual(0)
    })
  })
})
