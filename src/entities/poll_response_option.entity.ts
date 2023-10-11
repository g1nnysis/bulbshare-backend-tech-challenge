import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { PollItem } from './poll_item.entity'
import { PollResponse } from './poll_response.entity'

@Entity('poll_response_option')
export class PollResponseOption {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne('poll_item', 'responseOptions', { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'poll_item_id', referencedColumnName: 'id' }])
  pollItem: PollItem

  @Column()
  poll_item_id: number

  @OneToMany('poll_response', 'poll_response_option', { onDelete: 'CASCADE' })
  responses: PollResponse[]

  @Column()
  option_value: string
}
