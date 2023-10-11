import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Column } from 'typeorm'
import { PollItem } from './poll_item.entity'

@Entity('brief')
export class Brief {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  parent_brief_id: number

  @OneToMany('poll_item', 'brief')
  pollItems: PollItem[]
}
