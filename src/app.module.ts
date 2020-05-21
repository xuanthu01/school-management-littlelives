import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeOrmModuleConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
