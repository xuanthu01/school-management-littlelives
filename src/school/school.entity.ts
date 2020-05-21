import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { User } from 'src/auth/user.entity';

export enum PaymentType {
  FREE = "free",
  PAID = "paid"
}

@Entity()
@Unique(['name'])
export class School extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @ManyToOne(type => School, school => school.id)
  parent_id: string

  @Column({
    enum: PaymentType,
    default: PaymentType.FREE
  })
  payment_type: PaymentType

  @ManyToOne(type => User, user => user.id)
  owner_id: string
}

// id, name, parent_id (if parent_id is null = HQ level),
// payment_type (free, paid), owner_id
