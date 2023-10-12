import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { PollResponse } from './poll_response.entity'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number

  @Column({ type: 'integer', nullable: false })
  age!: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  gender!: string

  @Column({ type: 'integer', nullable: false })
  country_id!: number

  @OneToMany(() => PollResponse, pollResponse => pollResponse.user)
  pollResponses: PollResponse[]
}
