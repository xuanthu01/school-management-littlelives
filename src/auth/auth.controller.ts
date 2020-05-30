import { Controller, Post, Body, ValidationPipe, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Get('/user')
  async getUser(
    @Query('payment_type') payment_type: string
  ): Promise<User[]> {
    return this.authService.getUser(payment_type)
  }
  
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
