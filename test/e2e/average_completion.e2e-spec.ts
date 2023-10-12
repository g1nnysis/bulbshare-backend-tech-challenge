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

describe('POST /brief/:briefId/average_completion', () => {
  let app: INestApplication
  let moduleFixture: TestingModule
  let dataSource: DataSource
  let briefRepository: Repository<Brief>
  let pollResponseRepository: Repository<PollResponse>
  let userRepository: Repository<User>
  let pollItemRepository: Repository<PollItem>

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([User, Brief, PollResponse, PollItem])],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ transform: true }))

    await app.init()

    dataSource = moduleFixture.get(DataSource)
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User))
    briefRepository = moduleFixture.get<Repository<Brief>>(getRepositoryToken(Brief))
    pollResponseRepository = moduleFixture.get<Repository<PollResponse>>(getRepositoryToken(PollResponse))
    pollItemRepository = moduleFixture.get<Repository<PollItem>>(getRepositoryToken(PollItem))
  })

  beforeEach(async () => {
    await clearDatabase(dataSource.createQueryRunner())
  })

  afterEach(async () => {
    await app.close()
    await moduleFixture.close()
  })

  it('should calculate average completon time for a brief', async () => {
    const now: Date = new Date()
    const startTime: Date = new Date(now.getTime())
    const endTime1: Date = new Date(now.getTime() + 1000)
    const endTime2: Date = new Date(now.getTime() + 2000)

    await briefRepository.save(buildBrief())
    await userRepository.save([buildUser(), buildUser({ id: 2 })])
    await pollItemRepository.save(buildPollItem())
    await pollItemRepository.save(buildPollItem({ id: 2 }))
    await pollResponseRepository.save([
      buildPollResponse({ start_time: startTime, end_time: endTime1 }),
      buildPollResponse({ id: 2, user_id: 2, start_time: startTime, end_time: endTime2 }),
    ])
    await pollResponseRepository.save([buildPollResponse({ start_time: startTime, end_time: endTime1, poll_item_id: 2 })])

    const response = await request(app.getHttpServer()).post('/brief/1/average_completion').query({})

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({ average: 1500 })
  })

  it('should return 0 if brief does not exist', async () => {
    const response = await request(app.getHttpServer()).post('/brief/1/average_completion').query({})

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({ average: 0 })
  })
})
