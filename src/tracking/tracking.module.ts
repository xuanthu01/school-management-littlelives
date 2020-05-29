import { Module } from '@nestjs/common';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingRepository } from './tracking.repository';
import { SchoolRepository } from 'src/school/school.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrackingRepository, SchoolRepository])],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService]
})
export class TrackingModule { }
