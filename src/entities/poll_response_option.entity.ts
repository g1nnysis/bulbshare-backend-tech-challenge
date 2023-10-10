import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

@Entity()
export class PollResponseOption {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  optionValue: string
}
