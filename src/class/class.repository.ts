import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Class } from './class.entity';
import { ErrorCode } from 'src/shared/error-code';
import { User } from 'src/auth/user.entity';

@EntityRepository(Class)
export class ClassRepository extends Repository<Class>{

}