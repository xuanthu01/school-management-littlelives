import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
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

  @ManyToOne(type => User, user => user.id)
  // @JoinColumn({ name: 'teacher_id' })
  teacher_id: User

  @ManyToOne(type => School, school => school.id)
  // @JoinColumn({ name: 'school_id' })
  school_id: School
}
