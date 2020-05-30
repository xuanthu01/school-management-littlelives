import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackingRepository } from './tracking.repository';
import { Tracking } from './tracking.entity';
import { UserRole, User } from '../auth/user.entity';
import exportCSV from 'src/helpers/csv.helper';
import { School } from 'src/school/school.entity';
import { SchoolRepository } from 'src/school/school.repository';
import { filterPaymentTypes } from 'src/helpers/filter.helper';

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
  async getTracking(user: User, class_id: number): Promise<any> {
    console.log("TrackingService -> user role", user.role)
    switch (user.role) {
      case UserRole.HQ:
        //find all schools of HQ user
        const schools = await this.schoolRepository.find({ where: { owner_id: user.id } });
        // const freeSchools: School[] = filterPaymentTypes(schools, 'free');
        // const paidSchools: School[] = filterPaymentTypes(schools, 'paid');
        const school_ids = schools.map(school => school.id)
        const all_class = await this.schoolRepository.findAllClassOfSchool(school_ids);
        const classIds = all_class.map(c => c.class_id);
        const trackingsCsv = await this.trackingRepository.findTrackingByClassIds(classIds);
        return exportCSV(trackingsCsv);
        // const response = [];

        // schools.forEach(async school => {

        //   if (school.payment_type === 'paid') {
        //     // find all classes for each school
        //     const trackings = this.trackingRepository.findTrackingByClassIds(classIds);
        //     response.push(trackings);
        //     // return this.trackingRepository.findTrackingByClassIds(classIds);
        //   }
        //   else {
        //     const objErrors = {
        //       message: `School with id ${school.id} is free school`,
        //       hint: `Use some id: ${school_ids}`
        //     }
        //     // return this.trackingRepository.findTrackingByClassIds(classIds);
        //   }
        // })


      case UserRole.SCHOOL_OWNER:
        //TODO: optimize this query
        const school = await this.schoolRepository.findOne({ where: { owner_id: user.id } });
        if (!school) throw new NotFoundException(`Not found school for ${user.username}`);
        console.log("TrackingService -> school", school)
        const classes = await this.schoolRepository.findAllClassOfSchool([school.id]);
        const class_ids = classes.map(c => c.class_id);
        console.log("TrackingService -> class_ids", class_ids)
        if (school.payment_type === 'paid') {
          if (class_ids.length === 0) throw new NotFoundException(`Not found class in this school`);
          const data = await this.trackingRepository.findTrackingByClassIds(class_ids);
          return exportCSV(data);
        }
        else {
          if (class_ids.some(id => id == class_id)) {
            const _class = await this.schoolRepository.findOneClass(school.id, class_id)
            const dataCsv = await this.trackingRepository.findTrackingByClassIds([_class['class_id']]);
            return exportCSV(dataCsv);
          }
          else {
            const objectError = {
              message: `You are free school, please select specific class (by id) to tracking.Add ?class_id=x to tracking class with id 'x'`,
              hint: `All class in your school is: ${class_ids}`
            }
            throw new UnauthorizedException(objectError);
          }
        }


      case UserRole.SCHOOL_TEACHER:
        //only export list of activities for class you are have been assigned
        const data = await this.trackingRepository.findTrackingOfClassAssignedToUser(user);
        return exportCSV(data);

      case UserRole.USER:
        throw new UnauthorizedException('You are not allowed to access this resource.');
      default:
        break;
    }
  }
}
