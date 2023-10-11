import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { User } from './user.entity'
import { PollItem } from './poll_item.entity'
import { PollResponseOption } from './poll_response_option.entity'
import { Brief } from './brief.entity'

@Entity('poll_response')
export class PollResponse {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne('user', 'poll_response')
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user?: User

  @Column()
  user_id: number

  @ManyToOne('poll_item', 'pollResponses', { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'poll_item_id', referencedColumnName: 'id' }])
  pollItem: PollItem

  @Column()
  poll_item_id: number

  @ManyToOne('poll_response_option', 'poll_response', { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'response_option_id', referencedColumnName: 'id' }])
  responseOption?: PollResponseOption

  @Column()
  response: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_time: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  end_time: Date
}
