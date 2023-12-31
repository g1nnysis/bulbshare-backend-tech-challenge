import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'
import { PollItem } from './poll_item.entity'
import { PollResponseOption } from './poll_response_option.entity'

@Entity('poll_response')
export class PollResponse {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number

  @ManyToOne('user', 'poll_response')
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User

  @Column({ type: 'integer', nullable: false })
  user_id!: number

  @ManyToOne('poll_item', 'pollResponses', { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'poll_item_id', referencedColumnName: 'id' }])
  pollItem: PollItem

  @Column({ type: 'integer', nullable: false })
  poll_item_id!: number

  @Column({ type: 'integer', nullable: false })
  brief_id!: number

  @Column({ type: 'integer', nullable: true })
  response_option_id: number | null

  @ManyToOne('poll_response_option', 'poll_response', { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'response_option_id', referencedColumnName: 'id' }])
  responseOption: PollResponseOption

  @Column({ type: 'varchar', length: 255, nullable: false })
  content!: string | null

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_time!: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  end_time!: Date
}
