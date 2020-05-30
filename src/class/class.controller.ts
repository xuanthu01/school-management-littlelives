import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) { }

  @Get()
  async getClassAssignedTo(@GetUser() user: User) {
    return this.classService.getClassAssignedTo(user);
  }
}
