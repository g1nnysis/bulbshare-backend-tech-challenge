import { Test, TestingModule } from '@nestjs/testing'
import { PollResponseTypeOrmRepository } from '../../src/repositories/poll_response.repository'
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'
import { ormConfig } from '../../src/ormconfig'
import { PollItem } from '../../src/entities/poll_item.entity'
import { Brief } from '../../src/entities/brief.entity'
import { DataSource, Repository } from 'typeorm'
import { User } from '../../src/entities/user.entity'
import { PollItemType } from '../../src/common/enums'
import * as _ from 'lodash'
import { clearDatabase } from '../common-helpers'

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

  afterAll(async () => {
    testModule.close()
  })

  describe('getPollResponsesByCriteria', () => {
    it('should get poll responses and filter by criteria', async () => {
      await briefRepository.save({
        id: 1,
        name: 'test_brief',
      })

      await userRepository.save({
        id: 1,
        name: 'test_user',
        age: 20,
        country_id: 1,
        gender: 'female',
      })

      await userRepository.save({
        id: 2,
        name: 'test_user',
        age: 30,
        country_id: 2,
        gender: 'male',
      })

      await pollItemRepository.save({
        id: 1,
        brief_id: 1,
        type: PollItemType.MultiChoice,
        question: 'Test question',
      })

      await pollResponseRepository.save({
        user_id: 1,
        poll_item_id: 1,
        response: 'Option A',
        response_option_id: 1,
        start_time: new Date(),
        end_time: new Date(),
      })

      const result = await pollResponseRepository.getPollResponsesByCriteria(1, { age: [15, 20], country: [1], gender: ['female'] })

      expect(result.length).toEqual(1)
      expect(_.omit(result[0], ['start_time', 'end_time'])).toEqual({
        id: 1,
        user_id: 1,
        poll_item_id: 1,
        response: 'Option A',
      })
    })
  })
})
