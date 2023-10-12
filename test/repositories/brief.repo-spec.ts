import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from '../../src/ormconfig'
import { DataSource } from 'typeorm'
import { Brief } from '../../src/entities/brief.entity'
import { clearDatabase } from '../common-helpers'
import { buildBrief } from '../builders/brief.builder'
import { BriefTypeOrmRepository } from '../../src/repositories/brief.repository'

describe('Brief Repository', () => {
  let testModule: TestingModule
  let briefRepository: BriefTypeOrmRepository
  let dataSource: DataSource

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([Brief])],
      providers: [BriefTypeOrmRepository],
    }).compile()

    briefRepository = testModule.get<BriefTypeOrmRepository>(BriefTypeOrmRepository)
    dataSource = testModule.get(DataSource)
  })

  beforeEach(async () => {
    await clearDatabase(dataSource.createQueryRunner())
  })

  afterAll(() => {
    testModule.close()
  })

  describe('getAllBriefsForParent', () => {
    it('should get all linked briefs and parent brief by parent brief id', async () => {
      await briefRepository.save([buildBrief(), buildBrief({ id: 2, parent_brief_id: 1 }), buildBrief({ id: 3, parent_brief_id: 1 })])

      const result: Brief[] = await briefRepository.getAllBriefsForParent(1)

      expect(result.length).toEqual(3)
    })
  })
})
