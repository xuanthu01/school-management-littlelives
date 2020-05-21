import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { SignUpDto, SignInDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) { }
  async signUp(credentialsSignUp: SignUpDto): Promise<void> {
    return this.userRepository.signUp(credentialsSignUp);
  }
  async signIn(credentials: SignInDto): Promise<User> {
    const user = await this.userRepository.validatePassword(credentials);
    if (user) return user;
    else throw new UnauthorizedException("Invalid credentials");
  }
}
