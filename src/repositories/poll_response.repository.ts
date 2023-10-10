import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { PollResponseRepository } from './interfaces/poll_response_repository'
import { FilterCriteria } from '../modules/brief_analytics/schema'
import { PollResponse } from '../entities/poll_response.entity'
import { PollItemType } from '../common/enums'
import { AggregatedResponse } from '../modules/brief_analytics/dto'

@Injectable()
export class PollResponseTypeOrmRepository extends Repository<PollResponse> implements PollResponseRepository {
  constructor(private readonly dataSource: DataSource) {
    super(PollResponse, dataSource.createEntityManager())
  }

  async aggregateMultiChoiceResponses(pollItemId: number, filterCriteria: FilterCriteria): Promise<AggregatedResponse> {
    const query = this.createQueryBuilder('response')
      .innerJoin('response.pollItem', 'pollItem')
      .innerJoin('response.responseOption', 'option')
      .where('pollItem.id = :pollItemId', { pollItemId })
      .andWhere('pollItem.type = :type', { type: PollItemType.MultiChoice })

    if (filterCriteria.age) {
      query.andWhere('response.age BETWEEN :minAge AND :maxAge', {
        minAge: filterCriteria.age[0],
        maxAge: filterCriteria.age[1],
      })
    }

    if (filterCriteria.gender) {
      query.andWhere('response.gender IN (:...genders)', { genders: filterCriteria.gender })
    }

    if (filterCriteria.country && filterCriteria.country.length > 0) {
      query.andWhere('response.country IN (:...countries)', { countries: filterCriteria.country })
    }

    const responses: PollResponse[] = await query.getMany()
    const aggregatedResponses: { [option: string]: number } = {}

    responses.forEach(response => {
      response.responseOptions.forEach(option => {
        const optionValue = option.optionValue
        aggregatedResponses[optionValue] = (aggregatedResponses[optionValue] || 0) + 1
      })
    })

    return aggregatedResponses
  }
}
