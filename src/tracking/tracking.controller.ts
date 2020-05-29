import { Controller, Get, Param, UseGuards, Query, UnauthorizedException } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { Tracking } from './tracking.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User, UserRole } from 'src/auth/user.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorator/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) { }

  @Get()
  async getTracking(
    @Query('class_id') class_id: number,
    @GetUser() user: User
  ): Promise<Tracking[]> {
    if (user.role === UserRole.HQ)
      return this.trackingService.getAll()
    else throw new UnauthorizedException('You dont have permission to access');
  }
  @Get('/report')
  async getTrackingByClassId(@Query('class_id') class_id: number, @GetUser() user: User): Promise<Tracking[]> {
    return this.trackingService.getTracking(user, class_id);
  }
}
