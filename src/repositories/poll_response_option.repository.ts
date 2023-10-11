import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { PollResponseRepository } from './interfaces/poll_response_repository'
import { FilterCriteria } from '../modules/brief_analytics/schema'
import { PollResponse } from '../entities/poll_response.entity'
import { PollItemType } from '../common/enums'
import { PollResponseOption } from '../entities/poll_response_option.entity'
import { PollResponseOptionRepository } from './interfaces/poll_response_option'

@Injectable()
export class PollResponseOptionTypeOrmRepository extends Repository<PollResponseOption> implements PollResponseOptionRepository {
  constructor(private readonly dataSource: DataSource) {
    super(PollResponseOption, dataSource.createEntityManager())
  }

  async getByPollItemId(pollItemId: number): Promise<PollResponseOption[]> {
    const options: PollResponseOption[] = await this.find({ where: { poll_item_id: pollItemId } })

    return options
  }
}
