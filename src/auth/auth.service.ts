import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { SignUpDto, SignInDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(credentialsSignUp: SignUpDto): Promise<void> {
    return this.userRepository.signUp(credentialsSignUp);
  }
  async signIn(credentials: SignInDto) {
    const user = await this.userRepository.validateUserPassword(credentials);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const { username, role } = user;
    const payload: JwtPayload = { username, role };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
