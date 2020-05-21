import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm'
import { User } from 'src/auth/user.entity'
import { School } from 'src/school/school.entity'

@Entity()
export class Class extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  year: string

  @OneToOne(type => User, user => user.id)
  teacher_id: User

  @ManyToOne(type => School, school => school.id)
  school_id: School
}
