import { Test, TestingModule } from '@nestjs/testing'
import { PollResponseTypeOrmRepository } from '../../src/repositories/poll_response.repository'
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'
import { ormConfig } from '../../src/ormconfig'
import { PollItem } from '../../src/entities/poll_item.entity'
import { DataSource, Repository } from 'typeorm'
import { User } from '../../src/entities/user.entity'
import { PollResponseOption } from '../../src/entities/poll_response_option.entity'
import { PollItemTypeOrmRepository } from '../../src/repositories/poll_item.repository'
import { Brief } from '../../src/entities/brief.entity'
import { PollItemType } from '../../src/common/enums'
import * as _ from 'lodash'
import { clearDatabase } from '../common-helpers'
import { PollItemNotFound } from '../../src/common/exceptions'
import { buildBrief } from '../builders/brief.builder'
import { buildPollItem } from '../builders/poll_item.builder'
import { buildUser } from '../builders/user.builder'
import { buildPollResponse } from '../builders/poll_response.builder'

describe('Poll Item Repository', () => {
  let testModule: TestingModule
  let pollResponseRepository: PollResponseTypeOrmRepository
  let pollItemRepository: PollItemTypeOrmRepository
  let userRepository: Repository<User>
  let briefRepository: Repository<Brief>
  let dataSource: DataSource

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([PollItem, PollResponseOption, User, Brief])],
      providers: [PollResponseTypeOrmRepository, PollItemTypeOrmRepository],
    }).compile()

    userRepository = testModule.get<Repository<User>>(getRepositoryToken(User))
    briefRepository = testModule.get<Repository<Brief>>(getRepositoryToken(Brief))
    pollItemRepository = testModule.get<PollItemTypeOrmRepository>(PollItemTypeOrmRepository)
    pollResponseRepository = testModule.get<PollResponseTypeOrmRepository>(PollResponseTypeOrmRepository)
    dataSource = testModule.get(DataSource)
  })

  beforeEach(async () => {
    await clearDatabase(dataSource.createQueryRunner())
  })

  afterAll(async () => {
    testModule.close()
  })

  describe('getById', () => {
    it('should get a poll item by id', async () => {
      await briefRepository.save(buildBrief())
      await pollItemRepository.save(buildPollItem())

      const result: PollItem = await pollItemRepository.getById(1)

      expect(result).toEqual({
        id: 1,
        brief_id: 1,
        type: PollItemType.OpenText,
        question: 'Test question?',
      })
    })

    it('should throw PollItemNotFound if entity does not exist', async () => {
      await expect(pollItemRepository.getById(2)).rejects.toThrow(PollItemNotFound)
    })
  })

  describe('getPollItemResponsesByBriefId', () => {
    it('should get the average completion time for a brief', async () => {
      await briefRepository.save(buildBrief())
      await userRepository.save([buildUser(), buildUser({ id: 2 })])
      await pollItemRepository.save(buildPollItem())
      await pollResponseRepository.save([buildPollResponse(), buildPollResponse({ id: 2, user_id: 2 })])

      const result: PollItem[] = await pollItemRepository.getPollItemResponsesByBriefId(1)

      expect(result.length).toEqual(1)
    })
  })
})
