import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  organization_id: number

  @Column({ length: 255 })
  name: string
}
