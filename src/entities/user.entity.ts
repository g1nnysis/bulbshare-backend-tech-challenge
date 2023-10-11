import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { PollResponse } from './poll_response.entity'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  age!: number

  @Column()
  gender!: string

  @Column()
  country_id!: number

  @OneToMany(() => PollResponse, pollResponse => pollResponse.user)
  pollResponses: PollResponse[]
}
