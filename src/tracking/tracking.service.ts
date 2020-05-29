import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackingRepository } from './tracking.repository';
import { Tracking } from './tracking.entity';
import { UserRole, User } from '../auth/user.entity';
import exportCSV from 'src/helpers/csv.helper';
import { School } from 'src/school/school.entity';
import { SchoolRepository } from 'src/school/school.repository';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Tracking)
    private readonly trackingRepository: TrackingRepository,
    @InjectRepository(School)
    private readonly schoolRepository: SchoolRepository
  ) { }
  async getAll(): Promise<Tracking[]> {
    return this.trackingRepository.find({ loadRelationIds: true });
  }
  async getTracking(user: User, class_id: number): Promise<Tracking[]> {
    switch (user.role) {
      case UserRole.HQ:
        //TODO: export for free user and paid school
        return this.trackingRepository.find({ where: { class_id }, loadRelationIds: true });


      case UserRole.SCHOOL_OWNER:
        const school = await this.schoolRepository.findOne({ where: { owner_id: user.id }, });
        const classes = await this.schoolRepository.findAllClassOfSchool(school.id);
        const class_ids = classes.map(c => c.class_id);
        if (school.payment_type === 'paid') {
          return this.trackingRepository.findTrackingByClassIds(class_ids);
        }
        else {
          if (class_ids.some(id => id == class_id)) {
            const _class = await this.schoolRepository.findOneClass(school.id, class_id)
            return this.trackingRepository.findTrackingByClassIds([_class['class_id']]);
          }
          else {
            const objectError = {
              message: `You are free school, please select specific class (by id) to tracking.Add ?class_id=x to tracking class with id 'x'`,
              hint: `All class in your school is: ${class_ids}`
            }
            throw new UnauthorizedException(objectError);
          }
        }

      // return classes;
      // return this.trackingRepository.find({ where: { class_id }, loadRelationIds: true });


      case UserRole.SCHOOL_TEACHER:
        //only export list of activities for class you are have been assigned
        const data = await this.trackingRepository.findTrackingOfClassAssignedToUser(user);
        // return exportCSV(data);
        return data;

      case UserRole.USER:
        throw new UnauthorizedException('You are not allowed to access this resource.');
      default:
        break;
    }
  }
}
