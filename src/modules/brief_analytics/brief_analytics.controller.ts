import { Controller, Post, Body, Param } from '@nestjs/common'
import * as Schemas from './schema'
import { BriefAnalyticsService } from './brief_analytics.service'

@Controller('brief-analytics')
export class BriefAnalyticsController {
  constructor(private readonly briefAnalyticsService: BriefAnalyticsService) {}

  @Post('/poll-item/:pollItemId/aggregate-multi-choice')
  async aggregateMultiChoice(@Param('pollItemId') pollItemId: number, @Body() filterCriteria: Schemas.FilterCriteria) {
    return this.briefAnalyticsService.aggregateMultiChoiceResponses(pollItemId, filterCriteria)
  }

  @Post('/brief/:briefId/average_completion')
  async calculateAverageCompletion(@Param('briefId') briefId: number) {
    return this.briefAnalyticsService.calculateAverageBriefCompletionTime(briefId)
  }
}
