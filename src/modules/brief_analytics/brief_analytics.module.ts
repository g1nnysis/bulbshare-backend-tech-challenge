import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PollItem } from '../../entities/poll_item.entity'
import { Brief } from '../../entities/brief.entity'
import { BriefAnalyticsController } from './brief_analytics.controller'
import { BriefAnalyticsService } from './brief_analytics.service'
import { PollResponse } from '../../entities/poll_response.entity'
import { PollResponseTypeOrmRepository } from '../../repositories/poll_response.repository'
import { BriefTypeOrmRepository } from '../../repositories/brief.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PollResponse, Brief])],
  providers: [BriefAnalyticsService],
  controllers: [BriefAnalyticsController, PollResponseTypeOrmRepository, BriefTypeOrmRepository],
})
export class BriefAnalyticsModule {}
