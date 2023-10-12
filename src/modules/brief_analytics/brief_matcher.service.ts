import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PollItem } from '../../entities/poll_item.entity'
import { Brief } from '../../entities/brief.entity'
import { BriefTypeOrmRepository } from '../../repositories/brief.repository'
import { BriefRepository } from '../../repositories/interfaces/brief_repository'
import { PollItemNotFound } from '../../common/exceptions'

@Injectable()
export class BriefMatcherService {
  constructor(
    @InjectRepository(BriefTypeOrmRepository)
    private briefRepository: BriefRepository
  ) {}

  async identifyMatchingBriefs(pollItem: PollItem, briefId?: number): Promise<number[]> {
    if (pollItem.brief_id === briefId) return [briefId] // user wants results only for parent brief

    const allBriefs: Brief[] = await this.briefRepository.getAllBriefsForParent(pollItem.brief_id)

    if (briefId === undefined) {
      //user wants results for all briefs
      return allBriefs.map(brief => brief.id)
    }

    const clonedBrief: Brief | undefined = allBriefs.find(brief => brief.id === briefId) // user wants results for a specific brief, which is not the parent brief
    if (clonedBrief !== undefined) return [clonedBrief.id]

    throw new PollItemNotFound() // poll item does not belong to the parent brief or any of the cloned briefs
  }
}
