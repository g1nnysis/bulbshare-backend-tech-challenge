import { Controller, Post, Body, Param, Query } from '@nestjs/common'
import * as Schemas from './interfaces/schema'
import { BriefAnalyticsService } from './brief_analytics.service'

@Controller('brief-analytics')
export class BriefAnalyticsController {
  constructor(private readonly briefAnalyticsService: BriefAnalyticsService) {}

  @Post('/poll-item/:pollItemId/aggregate-multi-choice')
  async aggregateMultiChoice(@Param('pollItemId') pollItemId: number, @Body() filterCriteria: Schemas.FilterCriteria, @Query('brief_id') briefId?: number) {
    return this.briefAnalyticsService.aggregateMultiChoiceResponses(pollItemId, filterCriteria, briefId)
  }

  @Post('/brief/:briefId/average_completion')
  async calculateAverageCompletion(@Param('briefId') briefId: number) {
    return this.briefAnalyticsService.calculateAverageBriefCompletionTime(briefId)
  }
}
