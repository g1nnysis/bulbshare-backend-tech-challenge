import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'
import { DataSource, Repository } from 'typeorm'
import { clearDatabase } from '../common-helpers'
import { Brief } from '../../src/entities/brief.entity'
import { PollResponse } from '../../src/entities/poll_response.entity'
import { PollItem } from '../../src/entities/poll_item.entity'
import { User } from '../../src/entities/user.entity'
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'
import { buildBrief } from '../builders/brief.builder'
import { buildUser } from '../builders/user.builder'
import { buildPollItem } from '../builders/poll_item.builder'
import { buildPollResponse } from '../builders/poll_response.builder'
import { PollItemType } from '../../src/common/enums'
import { PollResponseOption } from '../../src/entities/poll_response_option.entity'
import { buildPollResponseOption } from '../builders/poll_response_option.builder'

describe('POST /poll-item/:pollItemId/aggregate-multi-choice', () => {
  let app: INestApplication
  let moduleFixture: TestingModule
  let dataSource: DataSource
  let briefRepository: Repository<Brief>
  let pollResponseRepository: Repository<PollResponse>
  let userRepository: Repository<User>
  let pollItemRepository: Repository<PollItem>
  let pollResponseOptionRepository: Repository<PollResponseOption>

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([User, Brief, PollResponse, PollItem, PollResponseOption])],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ transform: true }))

    await app.init()

    dataSource = moduleFixture.get(DataSource)
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User))
    briefRepository = moduleFixture.get<Repository<Brief>>(getRepositoryToken(Brief))
    pollResponseRepository = moduleFixture.get<Repository<PollResponse>>(getRepositoryToken(PollResponse))
    pollItemRepository = moduleFixture.get<Repository<PollItem>>(getRepositoryToken(PollItem))
    pollResponseOptionRepository = moduleFixture.get<Repository<PollResponseOption>>(getRepositoryToken(PollResponseOption))
  })

  beforeEach(async () => {
    await clearDatabase(dataSource.createQueryRunner())
  })

  afterEach(async () => {
    await app.close()
    await moduleFixture.close()
  })

  it('should aggregate poll responses for a parent brief based on criteria', async () => {
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

    await pollItemRepository.save(buildPollItem({ type: PollItemType.MultiChoice }))
    await pollResponseOptionRepository.save(buildPollResponseOption())
    await pollResponseRepository.save(buildPollResponse({ brief_id: 1, response_option_id: 1 }))

    const response = await request(app.getHttpServer())
      .post('/poll-item/1/aggregate-multi-choice')
      .send({ age: [15, 20], country: [1], gender: ['female'] })
      .query({ brief_id: 1 })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({ data: { a: 1 } })
  })

  it('should aggregate poll responses for a parent brief and all linked briefs', async () => {
    await briefRepository.save(buildBrief())
    await briefRepository.save(buildBrief({ id: 2, parent_brief_id: 1 }))
    await userRepository.save(buildUser())
    await userRepository.save(
      buildUser({
        id: 2,
        age: 30,
        country_id: 2,
        gender: 'male',
      })
    )

    await pollItemRepository.save(buildPollItem({ type: PollItemType.MultiChoice }))
    await pollResponseOptionRepository.save(buildPollResponseOption())

    await pollResponseRepository.save(buildPollResponse({ brief_id: 1, response_option_id: 1, user_id: 1 }))
    await pollResponseRepository.save(buildPollResponse({ id: 2, brief_id: 2, response_option_id: 1, user_id: 2 }))

    const response = await request(app.getHttpServer()).post('/poll-item/1/aggregate-multi-choice').send({})

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({ data: { a: 2 } })
  })

  it('should aggregate poll responses for a cloned (linked brief)', async () => {
    await briefRepository.save(buildBrief())
    await briefRepository.save(buildBrief({ id: 2, parent_brief_id: 1 }))
    await userRepository.save(buildUser())
    await userRepository.save(
      buildUser({
        id: 2,
        age: 30,
        country_id: 2,
        gender: 'male',
      })
    )

    await pollItemRepository.save(buildPollItem({ type: PollItemType.MultiChoice }))
    await pollResponseOptionRepository.save(buildPollResponseOption())

    await pollResponseRepository.save(buildPollResponse({ brief_id: 1, response_option_id: 1, user_id: 1 }))
    await pollResponseRepository.save(buildPollResponse({ id: 2, brief_id: 2, response_option_id: 1, user_id: 2 }))

    const response = await request(app.getHttpServer()).post('/poll-item/1/aggregate-multi-choice').send({}).query({ brief_id: 2 })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({ data: { a: 1 } })
  })

  it('should throw ERR_INCOMPATIBLE_POLL_TYPE if poll type is not multichoice', async () => {
    await briefRepository.save(buildBrief())
    await pollItemRepository.save(buildPollItem({ type: PollItemType.OpenText }))

    const response = await request(app.getHttpServer()).post('/poll-item/1/aggregate-multi-choice').query({})

    expect(response.status).toEqual(400)
    expect(response.body).toEqual({
      message: 'ERR_INCOMPATIBLE_POLL_ITEM_TYPE',
      statusCode: 400,
    })
  })
})
