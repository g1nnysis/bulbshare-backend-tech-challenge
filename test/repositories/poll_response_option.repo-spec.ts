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
import { buildBrief } from '../builders/brief.builder'
import { buildPollItem } from '../builders/poll_item.builder'
import { buildPollResponseOption } from '../builders/poll_response_option.builder'

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

  afterAll(() => {
    testModule.close()
  })

  describe('getByPollItemId', () => {
    it('should get poll responses by criteria', async () => {
      await briefRepository.save(buildBrief())
      await pollItemRepository.save(buildPollItem({ type: PollItemType.MultiChoice }))
      await pollResponseOptionRepository.save(buildPollResponseOption({ option_value: 'a' }))
      await pollResponseOptionRepository.save(buildPollResponseOption({ id: 2, option_value: 'b' }))

      const result = await pollResponseOptionRepository.getByPollItemId(1)

      expect(result.length).toEqual(2)
      expect(result).toEqual([
        {
          id: 1,
          poll_item_id: 1,
          option_value: 'a',
          content: 'Test response.',
        },
        {
          id: 2,
          poll_item_id: 1,
          option_value: 'b',
          content: 'Test response.',
        },
      ])
    })
  })
})
