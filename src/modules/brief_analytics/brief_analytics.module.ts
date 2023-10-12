import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PollItem } from '../../entities/poll_item.entity'
import { BriefAnalyticsController } from './brief_analytics.controller'
import { BriefAnalyticsService } from './brief_analytics.service'
import { PollResponse } from '../../entities/poll_response.entity'
import { PollResponseTypeOrmRepository } from '../../repositories/poll_response.repository'
import { PollItemTypeOrmRepository } from '../../repositories/poll_item.repository'
import { PollResponseOption } from '../../entities/poll_response_option.entity'
import { PollResponseOptionTypeOrmRepository } from '../../repositories/poll_response_option.repository'
import { BriefMatcherService } from './brief_matcher.service'
import { Brief } from '../../entities/brief.entity'
import { BriefTypeOrmRepository } from '../../repositories/brief.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PollResponse, PollItem, PollResponseOption, Brief])],
  providers: [BriefAnalyticsService, BriefMatcherService],
  controllers: [
    BriefAnalyticsController,
    PollResponseTypeOrmRepository,
    PollItemTypeOrmRepository,
    PollResponseOptionTypeOrmRepository,
    BriefTypeOrmRepository,
  ],
})
export class BriefAnalyticsModule {}
