import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail({}, {message: "Email must be a valid email address"})
  readonly email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' })
  readonly password: string;
}
