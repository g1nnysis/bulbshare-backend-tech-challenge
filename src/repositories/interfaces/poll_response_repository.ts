import { AggregatedResponse } from '../../modules/brief_analytics/dto'
import { FilterCriteria } from '../../modules/brief_analytics/schema'

export interface PollResponseRepository {
  aggregateMultiChoiceResponses(pollItemId: number, filterCriteria: FilterCriteria): Promise<AggregatedResponse>
}
