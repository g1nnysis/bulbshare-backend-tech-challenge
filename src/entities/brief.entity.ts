import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm'
import { PollItem } from './poll_item.entity'

@Entity('brief')
export class Brief {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number

  @Column({ type: 'integer', nullable: true })
  parent_brief_id: number | null

  @OneToMany('poll_item', 'brief')
  pollItems: PollItem[]
}
