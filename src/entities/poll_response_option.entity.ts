import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { PollItem } from './poll_item.entity'
import { PollResponse } from './poll_response.entity'

@Entity('poll_response_option')
export class PollResponseOption {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number

  @ManyToOne('poll_item', 'responseOptions', { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'poll_item_id', referencedColumnName: 'id' }])
  pollItem: PollItem

  @Column({ type: 'integer', nullable: false })
  poll_item_id!: number

  @OneToMany('poll_response', 'poll_response_option', { onDelete: 'CASCADE' })
  responses: PollResponse[]

  @Column({ type: 'varchar', length: 255, nullable: false })
  option_value!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  content!: string
}
