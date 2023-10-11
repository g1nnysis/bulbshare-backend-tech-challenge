import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'
import { ormConfig } from '../../src/ormconfig'
import { PollItem } from '../../src/entities/poll_item.entity'
import { Brief } from '../../src/entities/brief.entity'
import { DataSource, Repository } from 'typeorm'
import { PollItemType } from '../../src/common/enums'
import { PollResponseOptionTypeOrmRepository } from '../../src/repositories/poll_response_option.repository'
import { PollResponseOption } from '../../src/entities/poll_response_option.entity'
import { clearDatabase } from '../common-helpers'

describe('Poll Response Option Repository', () => {
  let testModule: TestingModule
  let pollItemRepository: Repository<PollItem>
  let briefRepository: Repository<Brief>
  let pollResponseOptionRepository: PollResponseOptionTypeOrmRepository
  let dataSource: DataSource

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([PollItem, PollResponseOption, Brief])],
      providers: [PollResponseOptionTypeOrmRepository],
    }).compile()

    dataSource = testModule.get(DataSource)
    briefRepository = testModule.get<Repository<Brief>>(getRepositoryToken(Brief))
    pollResponseOptionRepository = testModule.get<PollResponseOptionTypeOrmRepository>(PollResponseOptionTypeOrmRepository)
    pollItemRepository = testModule.get<Repository<PollItem>>(getRepositoryToken(PollItem))
  })

  beforeEach(async () => {
    await clearDatabase(dataSource.createQueryRunner())
  })

  afterAll(async () => {
    testModule.close()
  })

  describe('getByPollItemId', () => {
    it('should get poll responses by criteria', async () => {
      await briefRepository.save({
        id: 1,
        name: 'test_brief',
      })

      await pollItemRepository.save({
        id: 1,
        brief_id: 1,
        type: PollItemType.MultiChoice,
        question: 'Test question',
      })

      await pollResponseOptionRepository.save({
        id: 1,
        poll_item_id: 1,
        option_value: 'Option A',
      })

      await pollResponseOptionRepository.save({
        id: 2,
        poll_item_id: 1,
        option_value: 'Option B',
      })

      const result = await pollResponseOptionRepository.getByPollItemId(1)

      expect(result.length).toEqual(2)
      expect(result).toEqual([
        {
          id: 1,
          poll_item_id: 1,
          option_value: 'Option A',
        },
        {
          id: 2,
          poll_item_id: 1,
          option_value: 'Option B',
        },
      ])
    })
  })
})
