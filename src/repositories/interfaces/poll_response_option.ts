import { PollResponseOption } from '../../entities/poll_response_option.entity'

export interface PollResponseOptionRepository {
  getByPollItemId(pollItemId: number): Promise<PollResponseOption[]>
}
