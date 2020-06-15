import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config({
  path: '.development.env',
});
export const typeOrmModuleConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
 