import { Injectable } from '@nestjs/common';
import { SchoolRepository } from './school.repository';
import { School } from './school.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: SchoolRepository
  ) { }

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
    return this.schoolRepository.createSchool(createSchoolDto);
  }
  async getAllSchool(): Promise<School[]> {
    return await this.schoolRepository.find();
  }
}
