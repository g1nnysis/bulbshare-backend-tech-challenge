import { Brief } from '../../entities/brief.entity'

export interface BriefRepository {
  getAllBriefsForParent(briefId: number): Promise<Brief[]>
}
