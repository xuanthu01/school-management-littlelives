import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { SchoolModule } from './school/school.module';
import { TrackingModule } from './tracking/tracking.module';
import { ReportModule } from './report/report.module';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeOrmModuleConfig),
    ClassModule,
    SchoolModule,
    TrackingModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
