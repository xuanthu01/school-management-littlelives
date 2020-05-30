import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { User } from './user.entity';
import { SignUpDto } from './dto/auth-credential.dto';
import { ErrorCode } from 'src/shared/error-code';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(credentialsSignUp: SignUpDto): Promise<void> {
    const { username, password } = credentialsSignUp;
    const user = new User();
    const salt = await genSalt();
    const hashed = await hash(password, salt);
    user.username = username;
    user.password = hashed;
    user.salt = salt;
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === ErrorCode.DUPLICATE_KEY) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async validateUserPassword(credentialsSignUp: SignUpDto): Promise<User> {
    const { username, password } = credentialsSignUp;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
  async findUserWithPaymentMethod(payment_type: string) {
    //select * from public.school inner join public.user on school.owner_id = "user".id where "payment_type" = 'free'

    const query = this.createQueryBuilder('user')

    query
      .addSelect('school.id')
      .addSelect('school.payment_type')
      .innerJoin('school', 'school', 'school.owner_id = user.id')
      .where('payment_type = :payment_type', { payment_type })

    return query.getRawMany();


  }
}
