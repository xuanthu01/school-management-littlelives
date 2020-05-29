import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassRepository } from './class.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClassRepository])],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule { }
