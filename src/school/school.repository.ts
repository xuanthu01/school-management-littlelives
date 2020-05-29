import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { School, PaymentType } from './school.entity';
import { ErrorCode } from 'src/shared/error-code';
import { CreateSchoolDto } from './dto/create-school.dto';

@EntityRepository(School)
export class SchoolRepository extends Repository<School>{
  async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
    const { name, owner_id, parent_id, payment_type } = createSchoolDto;
    const school = new School();
    school.name = name;
    school.owner_id = owner_id;
    school.parent_id = parent_id;
    school.payment_type = payment_type || PaymentType.FREE;
    try {
      const result = await school.save();
      return result;
    } catch (error) {
      console.log(error);
      if (error.code === ErrorCode.DUPLICATE_KEY) {
        throw new ConflictException("School already exists");
      }
      else {
        throw new InternalServerErrorException();
      }
    }
  }
  async findOneClass(school_id: string, class_id: number) {
    const query = this.createQueryBuilder('school');
    query
      .addSelect('class.name')
      .addSelect('class.year')
      .addSelect('class.id')
      .innerJoin('class', 'class', 'class.school_id = school.id')
      .where('school.id = :school_id', { school_id })
      .andWhere('class.id = :class_id', { class_id })

    return query.getRawOne();
  }
  async findAllClassOfSchool(school_id: string) {
    const query = this.createQueryBuilder('school');
    query
      .addSelect('class.name')
      .addSelect('class.year')
      .addSelect('class.id')
      .innerJoin('class', 'class', 'class.school_id = school.id')
      .where('school.id = :school_id', { school_id })

    return query.getRawMany();
  }
}