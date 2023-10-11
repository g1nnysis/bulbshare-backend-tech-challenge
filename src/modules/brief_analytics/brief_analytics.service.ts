import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PollResponseTypeOrmRepository } from '../../repositories/poll_response.repository'
import { PollResponseRepository } from '../../repositories/interfaces/poll_response_repository'
import { PollResponseOptionRepository } from '../../repositories/interfaces/poll_response_option'
import { PollResponseOptionTypeOrmRepository } from '../../repositories/poll_response_option.repository'
import { PollItemTypeOrmRepository } from '../../repositories/poll_item.repository'
import { PollItemRepository } from '../../repositories/interfaces/poll_item_repository'
import { PollItem } from '../../entities/poll_item.entity'
import { calculateAverageCompletionTime } from './utils/completion_time_calculator'
import { PollResponse } from '../../entities/poll_response.entity'
import { aggregateMultiChoicePollResponses } from './utils/response_aggregator'
import { PollItemType } from '../../common/enums'
import { IncompatiblePollItemType } from '../../common/exceptions'
import { PollResponseOption } from '../../entities/poll_response_option.entity'
import { AggregatedResponse } from './dto'

@Injectable()
export class BriefAnalyticsService {
  constructor(
    @InjectRepository(PollResponseTypeOrmRepository)
    private pollResponseRepository: PollResponseRepository,
    @InjectRepository(PollItemTypeOrmRepository)
    private pollItemRepository: PollItemRepository,
    @InjectRepository(PollResponseOptionTypeOrmRepository)
    private pollResponseOptionRepository: PollResponseOptionRepository
  ) {}

  async aggregateMultiChoiceResponses(pollItemId: number, filterCriteria: any): Promise<AggregatedResponse> {
    const pollItem: PollItem = await this.pollItemRepository.getById(pollItemId)

    if (pollItem.type !== PollItemType.MultiChoice) {
      throw new IncompatiblePollItemType()
    }

    const responses: PollResponse[] = await this.pollResponseRepository.getPollResponsesByCriteria(pollItemId, filterCriteria)
    const responseOptions: PollResponseOption[] = await this.pollResponseOptionRepository.getByPollItemId(pollItemId)

    return aggregateMultiChoicePollResponses(responses, responseOptions)
  }

  async calculateAverageBriefCompletionTime(briefId: number): Promise<number> {
    const pollItems: PollItem[] = await this.pollItemRepository.getPollItemResponsesByBriefId(briefId)

    return calculateAverageCompletionTime(pollItems)
  }
}
