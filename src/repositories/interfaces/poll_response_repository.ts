import { PollResponse } from '../../entities/poll_response.entity'
import { FilterCriteria } from '../../modules/brief_analytics/interfaces/schema'

export interface PollResponseRepository {
  getPollResponsesByCriteria(pollItemId: number, filterCriteria: FilterCriteria, briefIds: number[]): Promise<PollResponse[]>
}
