import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(
    @Body(ValidationPipe) credentialsSignUp: SignUpDto,
  ): Promise<void> {
    return this.authService.signUp(credentialsSignUp);
  }

  @Post('/sign-in')
  async signIn(
    @Body(ValidationPipe) credentials: SignInDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(credentials);
  }
}