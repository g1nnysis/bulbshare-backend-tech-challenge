import { Test, TestingModule } from '@nestjs/testing'
import { PollResponseTypeOrmRepository } from '../../src/repositories/poll_response.repository'
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'
import { ormConfig } from '../../src/ormconfig'
import { PollItem } from '../../src/entities/poll_item.entity'
import { Brief } from '../../src/entities/brief.entity'
import { DataSource, Repository } from 'typeorm'
import { User } from '../../src/entities/user.entity'
import * as _ from 'lodash'
import { clearDatabase } from '../common-helpers'
import { buildBrief } from '../builders/brief.builder'
import { buildUser } from '../builders/user.builder'
import { buildPollItem } from '../builders/poll_item.builder'
import { buildPollResponse } from '../builders/poll_response.builder'

describe('Poll Response Repository', () => {
  let testModule: TestingModule
  let pollResponseRepository: PollResponseTypeOrmRepository
  let userRepository: Repository<User>
  let pollItemRepository: Repository<PollItem>
  let briefRepository: Repository<Brief>
  let dataSource: DataSource

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([PollItem, User, Brief])],
      providers: [PollResponseTypeOrmRepository],
    }).compile()

    userRepository = testModule.get<Repository<User>>(getRepositoryToken(User))
    briefRepository = testModule.get<Repository<Brief>>(getRepositoryToken(Brief))
    pollResponseRepository = testModule.get<PollResponseTypeOrmRepository>(PollResponseTypeOrmRepository)
    pollItemRepository = testModule.get<Repository<PollItem>>(getRepositoryToken(PollItem))
    dataSource = testModule.get(DataSource)
  })

  beforeEach(async () => {
    await clearDatabase(dataSource.createQueryRunner())
  })

  afterAll(() => {
    testModule.close()
  })

  describe('getPollResponsesByCriteria', () => {
    it('should get poll responses and filter by criteria', async () => {
      await briefRepository.save(buildBrief())
      await userRepository.save(buildUser())
      await userRepository.save(
        buildUser({
          id: 2,
          age: 30,
          country_id: 2,
          gender: 'male',
        })
      )

      await pollItemRepository.save(buildPollItem())
      await pollResponseRepository.save(buildPollResponse({ brief_id: 1 }))

      const result = await pollResponseRepository.getPollResponsesByCriteria(1, { age: [15, 20], country: [1], gender: ['female'] }, [1])

      expect(result.length).toEqual(1)
      expect(_.omit(result[0], ['start_time', 'end_time'])).toEqual({
        id: 1,
        user_id: 1,
        brief_id: 1,
        poll_item_id: 1,
        response_option_id: null,
        content: 'Test response.',
      })
    })
  })
})
