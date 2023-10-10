import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  age: number

  @Column({ length: 255 })
  gender: string

  @Column()
  country_id: number
}
