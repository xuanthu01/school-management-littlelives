import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Tracking } from './tracking.entity';
import { ErrorCode } from 'src/shared/error-code';
import { User } from 'src/auth/user.entity';

@EntityRepository(Tracking)
export class TrackingRepository extends Repository<Tracking>{
  async findTrackingForUser(user: User, class_id: number): Promise<Tracking[]> {
    const query = this.createQueryBuilder('tracking');

    query
      .addSelect('class.name')
      .addSelect('class.school_id', 'school_id')
      .addSelect('user.username', 'teacher_name')
      .innerJoin('class', 'class', 'tracking.class_id = class.id')
      .innerJoin('user', 'user', 'class.teacher_id = user.id')
      .where('user.id = :user_id', { user_id: user.id })
      .andWhere('tracking.class_id = :class_id', { class_id })
    // .andWhereInIds()

    const trackings = query.getRawMany();
    return trackings;
  }
  async findTrackingOfClassAssignedToUser(user: User) {
    const query = this.createQueryBuilder('tracking');
    query
      .addSelect('class.name')
      .addSelect('user.username', 'teacher_name')
      .leftJoin('class', 'class', 'tracking.class_id = class.id')
      .leftJoin('user', 'user', 'class.teacher_id = user.id')
      .where('user.id = :user_id', { user_id: user.id })
      .orderBy('tracking.time_check_in', 'DESC')

    return query.getRawMany();
  }
  async findTrackingByClassIds(class_ids: number[]) {
    const query = this.createQueryBuilder('tracking');
    query
      .addSelect('class.name')
      .addSelect('class.school_id', 'school_id')
      // .addSelect('class.id')
      .addSelect('user.username', 'teacher_name')
      .innerJoin('class', 'class', 'tracking.class_id = class.id')
      .innerJoin('user', 'user', 'class.teacher_id = user.id')
      .where('tracking.class_id IN (:...class_ids)', { class_ids })
      .orderBy('tracking.time_check_in', 'DESC')

    const trackings = await query.getRawMany();
    console.log("TrackingRepository -> findTrackingByClassIds -> trackings", trackings.length)
    return trackings;
  }
}