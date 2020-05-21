import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/sign-up')
  async signUp(
    @Body(ValidationPipe) credentialsSignUp: SignUpDto,
  ): Promise<void> {
    return this.authService.signUp(credentialsSignUp);
  }

  @Post('/sign-in')
  async signIn(
    @Body(ValidationPipe) credentials: SignInDto
  ): Promise<User> {
    return this.authService.signIn(credentials);
  }
}
