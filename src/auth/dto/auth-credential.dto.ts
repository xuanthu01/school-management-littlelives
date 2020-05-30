import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentials {
  @IsString()
  @MinLength(4)
  @MaxLength(48)
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too week',
  })
  @ApiProperty({
    default: 'Aa!@#123'
  })
  password: string;
}
export class SignUpDto extends AuthCredentials {
  // TODO: extends multiple information
}
export class SignInDto extends AuthCredentials { }
