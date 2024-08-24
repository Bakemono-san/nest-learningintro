import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

export class User {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(['admin', 'vendeur', 'client'])
  role: 'admin' | 'vendeur' | 'client';

  @ValidateIf((o) => o.role === 'client')
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ValidateIf((o) => o.role === 'client')
  @IsNotEmpty()
  @IsNumber()
  totalDettes: number;

  @ValidateIf((o) => o.role === 'client')
  @IsNotEmpty()
  @IsNumber()
  totalDettesPayee: number;

  @ValidateIf((o) => o.role === 'client')
  @IsNotEmpty()
  @IsNumber()
  totalDettesRestant: number;
}
