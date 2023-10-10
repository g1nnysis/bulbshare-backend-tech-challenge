import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { PollResponseOption } from './poll_response_option.entity'
import { Brief } from './brief.entity'

@Entity()
export class PollResponse {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @Column()
  poll_item_id: number

  @Column({ length: 255 })
  response: string

  @Column({ type: 'timestamp' })
  start_time: Date

  @Column({ type: 'timestamp' })
  end_time: Date

  @ManyToMany(() => PollResponseOption)
  @JoinTable()
  responseOptions: PollResponseOption[]

  @ManyToOne(() => Brief, brief => brief.pollResponses)
  brief: Brief
}
