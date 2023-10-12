import { Controller, Post, Body, Param, Query } from '@nestjs/common'
import * as Schemas from './interfaces/schema'
import { BriefAnalyticsService } from './brief_analytics.service'

@Controller()
export class BriefAnalyticsController {
  constructor(private readonly briefAnalyticsService: BriefAnalyticsService) {}

  @Post('/poll-item/:pollItemId/aggregate-multi-choice')
  async aggregateMultiChoice(
    @Param('pollItemId') pollItemId: number,
    @Body() filterCriteria: Schemas.FilterCriteria,
    @Query('brief_id') briefId?: string
  ): Promise<Schemas.AggregatedResponse> {
    const data = await this.briefAnalyticsService.aggregateMultiChoiceResponses(pollItemId, filterCriteria, briefId)

    return { data }
  }

  @Post('/brief/:briefId/average_completion')
  async calculateAverageCompletion(@Param('briefId') briefId: number): Promise<Schemas.AverageCompletionResponse> {
    const average: number = await this.briefAnalyticsService.calculateAverageBriefCompletionTime(briefId)

    return { average }
  }
}
