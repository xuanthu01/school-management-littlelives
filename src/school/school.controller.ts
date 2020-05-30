import { Controller, Post, Body, ValidationPipe, Get, UseGuards } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { SchoolService } from './school.service';
import { School } from './school.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('school')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) { }
  @Get()
  async getAll(): Promise<School[]> {
    return this.schoolService.getAllSchool();
  }
  
  @Post()
  @Roles('HQ')
  async create(@Body(ValidationPipe) newSchoolDto: CreateSchoolDto, @GetUser() user: User) {
    newSchoolDto.owner_id = user.id;
    return this.schoolService.createSchool(newSchoolDto);
  }
}
