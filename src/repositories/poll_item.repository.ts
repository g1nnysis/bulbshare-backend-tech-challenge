import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Brief } from '../entities/brief.entity'
import { PollItemRepository } from './interfaces/poll_item_repository'
import { mockObject } from '../../test/common-helpers'
import { PollItem } from '../entities/poll_item.entity'
import { groupBy } from 'rxjs'
import { PollResponse } from '../entities/poll_response.entity'
import { PollItemNotFound } from '../common/exceptions'

@Injectable()
export class PollItemTypeOrmRepository extends Repository<PollItem> implements PollItemRepository {
  constructor(private readonly dataSource: DataSource) {
    super(PollItem, dataSource.createEntityManager())
  }

  async getById(pollItemId: number): Promise<PollItem> {
    const pollItem: PollItem | null = await this.findOne({ where: { id: pollItemId } })

    if (pollItem === null) {
      throw new PollItemNotFound()
    }

    return pollItem
  }

  async getPollItemResponsesByBriefId(briefId: number): Promise<PollItem[]> {
    const pollItem: PollItem[] = await this.createQueryBuilder('poll_item')
      .where({ brief_id: briefId })
      .leftJoinAndMapMany('poll_item.pollResponses', 'poll_response', 'pollResponses', 'poll_item.id = pollResponses.poll_item_id')
      .getMany()

    return pollItem
  }
}
