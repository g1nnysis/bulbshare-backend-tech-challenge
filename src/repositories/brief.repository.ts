import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { Brief } from '../entities/brief.entity'
import { BriefRepository } from './interfaces/brief_repository'

@Injectable()
export class BriefTypeOrmRepository extends Repository<Brief> implements BriefRepository {
  constructor(private readonly dataSource: DataSource) {
    super(Brief, dataSource.createEntityManager())
  }

  async getAllBriefsForParent(briefId: number): Promise<Brief[]> {
    const briefs: Brief[] = await this.find({ where: [{ id: briefId }, { parent_brief_id: briefId }] })

    return briefs
  }
}
