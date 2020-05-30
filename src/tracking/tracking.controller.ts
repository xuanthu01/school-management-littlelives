import { Controller, Get, Param, UseGuards, Query, UnauthorizedException, Res, Body } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { Tracking } from './tracking.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User, UserRole } from 'src/auth/user.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Response } from 'express';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger'
import { QueryTrackingDto } from './dto/query-tracking.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) { }

  @Get()
  async getTracking(
    @GetUser() user: User
  ): Promise<Tracking[]> {
    if (user.role === UserRole.HQ)
      return this.trackingService.getAll()
    else throw new UnauthorizedException('You dont have permission to access');
  }
  @Get('/report')
  async getTrackingByClassId(
    @GetUser() user: User,
    @Res() res: Response,
    @Query() query: QueryTrackingDto, ): Promise<any> {
    // return this.trackingService.getTracking(user, class_id);
    const stream = await this.trackingService.getTracking(user, query.class_id);
    res.set({
      'Content-Type': 'text/csv',
      // 'Content-Length': stream.length,
    });
    res.send(stream)
  }
}
