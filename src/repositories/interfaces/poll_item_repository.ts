import { PollItem } from '../../entities/poll_item.entity'

export interface PollItemRepository {
  getPollItemResponsesByBriefId(briefId: number): Promise<PollItem[]>
  getById(pollItemId: number): Promise<PollItem>
}
