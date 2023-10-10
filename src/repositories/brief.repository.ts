import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Brief } from '../entities/brief.entity'
import { BriefRepository } from './interfaces/brief_repository'

@Injectable()
export class BriefTypeOrmRepository extends Repository<Brief> implements BriefRepository {
  constructor(private readonly dataSource: DataSource) {
    super(Brief, dataSource.createEntityManager())
  }

  async getAverageCompletionTime(briefId: number): Promise<Brief> {
    const brief: Brief = await this.findOneOrFail({
      where: { id: briefId },
      relations: ['pollResponses'],
    })

    return brief
  }
}
