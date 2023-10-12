import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { PollResponseRepository } from './interfaces/poll_response_repository'
import { FilterCriteria } from '../modules/brief_analytics/interfaces/schema'
import { PollResponse } from '../entities/poll_response.entity'

@Injectable()
export class PollResponseTypeOrmRepository extends Repository<PollResponse> implements PollResponseRepository {
  constructor(private readonly dataSource: DataSource) {
    super(PollResponse, dataSource.createEntityManager())
  }

  async getPollResponsesByCriteria(pollItemId: number, filterCriteria: FilterCriteria, briefIds: number[]): Promise<PollResponse[]> {
    const query = this.createQueryBuilder('poll_response')
      .leftJoin('poll_response.user', 'user', 'user.id = poll_response.user_id')
      .where('poll_response.poll_item_id = :pollItemId', { pollItemId })
      .andWhere('poll_response.brief_id IN (:...briefIds)', { briefIds })

    if (filterCriteria.age) {
      query.andWhere('user.age BETWEEN :minAge AND :maxAge', {
        minAge: filterCriteria.age[0],
        maxAge: filterCriteria.age[1],
      })
    }

    if (filterCriteria.gender) {
      query.andWhere('user.gender IN (:...genders)', { genders: filterCriteria.gender })
    }

    if (filterCriteria.country && filterCriteria.country.length > 0) {
      query.andWhere('user.country_id IN (:...countries)', { countries: filterCriteria.country })
    }

    const responses: PollResponse[] = await query.getMany()

    return responses
  }
}
