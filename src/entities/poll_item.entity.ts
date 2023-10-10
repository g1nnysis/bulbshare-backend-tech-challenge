import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { PollItemType } from '../common/enums'

@Entity()
export class PollItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  brief_id: number

  @Column({ type: 'enum', enum: PollItemType })
  type: string

  @Column('text')
  question: string
}
