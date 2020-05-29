import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../auth/user.entity';

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
  // @JoinColumn({ name: 'parent_id' })
  parent_id: string

  @Column({
    enum: PaymentType,
    default: PaymentType.FREE
  })
  payment_type: PaymentType

  @OneToOne(type => User, user => user.id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'owner_id' })
  owner_id: string
}

// id, name, parent_id (if parent_id is null = HQ level),
// payment_type (free, paid), owner_id
