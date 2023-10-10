import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { PollResponse } from './poll_response.entity'

@Entity()
export class Brief {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  channel_id: number

  @Column()
  parent_brief_id: number

  @OneToMany(() => PollResponse, pollResponse => pollResponse.brief)
  pollResponses: PollResponse[]
}
