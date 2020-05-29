import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm'
import { Class } from '../class/class.entity'

@Entity()
export class Tracking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  child_name: string

  @ManyToOne(type => Class, cl => cl.id)
  // @JoinColumn({ name: 'classIdId' })
  class_id: number

  @Column({
    type: "timestamp with time zone"
  })
  time_check_in: Date

  @Column({
    type: "timestamp with time zone"
  })
  time_check_out: Date
}