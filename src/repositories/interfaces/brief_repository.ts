import { Brief } from '../../entities/brief.entity'
import { AggregatedResponse } from '../../modules/brief_analytics/dto'
import { FilterCriteria } from '../../modules/brief_analytics/schema'

export interface BriefRepository {
  getAverageCompletionTime(briefId: number): Promise<Brief>
}
