import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { Brief } from './brief.entity'
import { PollResponse } from './poll_response.entity'
import { PollResponseOption } from './poll_response_option.entity'

@Entity('poll_item')
export class PollItem {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number

  @ManyToOne('brief', 'poll_item')
  @JoinColumn([{ name: 'brief_id', referencedColumnName: 'id' }])
  brief!: Brief

  @Column({ type: 'integer', nullable: false })
  brief_id!: number

  @Column({
    type: 'enum',
    enum: ['swipe', 'radio', 'multichoice', 'opentext'],
  })
  type!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  question!: string

  @OneToMany('poll_item', 'poll_response_option')
  responseOptions: PollResponseOption[]

  @OneToMany('poll_response', 'poll_item')
  pollResponses: PollResponse[]
}
