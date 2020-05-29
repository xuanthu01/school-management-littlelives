import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassRepository } from './class.repository';
import { User } from 'src/auth/user.entity';
@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private repository: ClassRepository
  ) { }

  async getClassAssignedTo(user: User) {
    return this.repository.find({ where: { teacher_id: user.id } })
  }
}
