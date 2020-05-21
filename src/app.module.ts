import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmModuleConfig } from './config/typeorm.config';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeOrmModuleConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
