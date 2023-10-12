import { Test, TestingModule } from '@nestjs/testing'
import { Provider } from '@nestjs/common'
import { when } from 'jest-when'
import { mockObject } from '../../../test/common-helpers'
import { PollItem } from '../../entities/poll_item.entity'
import { PollItemNotFound } from '../../common/exceptions'
import { BriefMatcherService } from './brief_matcher.service'
import { BriefTypeOrmRepository } from '../../repositories/brief.repository'
import { Brief } from '../../entities/brief.entity'

describe('BriefMatcherService', () => {
  let service: BriefMatcherService
  let briefRepository: BriefTypeOrmRepository

  const briefRepositoryProvider: Provider = {
    provide: BriefTypeOrmRepository,
    useFactory: (): unknown => ({
      getAllBriefsForParent: jest.fn(),
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BriefMatcherService, briefRepositoryProvider],
    }).compile()

    service = module.get<BriefMatcherService>(BriefMatcherService)
    briefRepository = module.get<BriefTypeOrmRepository>(BriefTypeOrmRepository)
  })

  describe('identifyMatchingBriefs', () => {
    const parentBriefId: number = 1
    const linkedBrief1: number = 2

    it('should return the briefId, if input briefId is defined and matches the one on the pollItem', async () => {
      const pollItem: PollItem = mockObject({ brief_id: parentBriefId })

      const result = await service.identifyMatchingBriefs(pollItem, '1')

      expect(result).toEqual([parentBriefId])
    })

    it('should return all linked & parent brief ids, if input briefId is undefined', async () => {
      const pollItem: PollItem = mockObject({ brief_id: parentBriefId })
      const briefs: Brief[] = [mockObject({ id: parentBriefId }), mockObject({ id: linkedBrief1 })]
      const getAllBriefsForParent: jest.SpyInstance = jest.spyOn(briefRepository, 'getAllBriefsForParent')

      when(getAllBriefsForParent).expectCalledWith(parentBriefId).mockReturnValueOnce(briefs)

      const result = await service.identifyMatchingBriefs(pollItem)

      expect(result).toEqual([parentBriefId, linkedBrief1])
    })

    it('should return the linked briefId if input briefId is defined & not equal to parent brief', async () => {
      const pollItem: PollItem = mockObject({ brief_id: parentBriefId })
      const briefs: Brief[] = [mockObject({ id: parentBriefId }), mockObject({ id: linkedBrief1 })]
      const getAllBriefsForParent: jest.SpyInstance = jest.spyOn(briefRepository, 'getAllBriefsForParent')

      when(getAllBriefsForParent).expectCalledWith(parentBriefId).mockReturnValueOnce(briefs)

      const result = await service.identifyMatchingBriefs(pollItem, '2')

      expect(result).toEqual([linkedBrief1])
    })

    it('should throw PollItemNotFound if none of the linked briefs containing the pollItem match the requested briefId', async () => {
      const pollItem: PollItem = mockObject({ brief_id: parentBriefId })
      const briefs: Brief[] = [mockObject({ id: parentBriefId }), mockObject({ id: linkedBrief1 })]
      const getAllBriefsForParent: jest.SpyInstance = jest.spyOn(briefRepository, 'getAllBriefsForParent')

      when(getAllBriefsForParent).expectCalledWith(parentBriefId).mockReturnValueOnce(briefs)

      await expect(service.identifyMatchingBriefs(pollItem, '3')).rejects.toThrow(PollItemNotFound)
    })
  })
})
