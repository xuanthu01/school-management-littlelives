// id, child_name, class_id, time_check_in, time_check_out

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Tracking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  child_name: string

  @Column()
  class_id: string

  @Column()
  time_check_in: string

  @Column()
  time_check_out: string
}