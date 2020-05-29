import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
export class AuthCredentials {
  @IsString()
  @MinLength(4)
  @MaxLength(48)
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too week',
  })
  password: string;
}
export class SignUpDto extends AuthCredentials {
  // TODO: extends multiple information
}
export class SignInDto extends AuthCredentials {}
