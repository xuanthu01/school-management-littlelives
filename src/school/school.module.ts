import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolRepository } from './school.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolRepository])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule { }
