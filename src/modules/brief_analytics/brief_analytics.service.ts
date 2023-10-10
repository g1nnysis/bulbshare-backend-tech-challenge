import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PollResponseTypeOrmRepository } from '../../repositories/poll_response.repository'
import { PollResponseRepository } from '../../repositories/interfaces/poll_response_repository'
import { AggregatedResponse } from './dto'
import { BriefTypeOrmRepository } from '../../repositories/brief.repository'
import { BriefRepository } from '../../repositories/interfaces/brief_repository'
import { Brief } from '../../entities/brief.entity'

@Injectable()
export class BriefAnalyticsService {
  constructor(
    @InjectRepository(PollResponseTypeOrmRepository)
    private pollResponseRepository: PollResponseRepository,
    @InjectRepository(BriefTypeOrmRepository)
    private briefRepository: BriefRepository
  ) {}

  async aggregateMultiChoiceResponses(pollItemId: number, filterCriteria: any): Promise<AggregatedResponse> {
    return this.pollResponseRepository.aggregateMultiChoiceResponses(pollItemId, filterCriteria)
  }

  async calculateAverageCompletionTime(briefId: number): Promise<number> {
    const brief: Brief = await this.briefRepository.getAverageCompletionTime(briefId)

    const completionTimes = brief.pollResponses.map(response => {
      const completionTime = response.end_time.getTime() - response.start_time.getTime()
      return completionTime
    })

    if (completionTimes.length === 0) {
      return 0
    }

    const totalCompletionTime = completionTimes.reduce((acc, time) => acc + time, 0)
    const averageCompletionTime = totalCompletionTime / completionTimes.length

    return averageCompletionTime
  }
}
