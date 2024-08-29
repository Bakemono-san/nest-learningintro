import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsEnum,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Strong password for the user account',
    example: 'P@ssw0rd!',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Confirmation of the strong password for the user account',
    example: 'P@ssw0rd!',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  confirmationPassword: string;

  @ApiProperty({
    description: 'Role of the user in the system',
    example: 'admin',
    enum: ['admin', 'vendeur', 'client'],
  })
  @IsNotEmpty()
  @IsEnum(['admin', 'vendeur', 'client'])
  role: 'admin' | 'vendeur' | 'client';

  @ApiProperty({
    description: 'Photo of the user (required if role is client)',
    example: 'photo.jpg',
    required: false,
  })
  @ValidateIf((o) => o.role === 'client')
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ApiProperty({
    description: 'Total debts of the user (required if role is client)',
    example: 1000,
    required: false,
  })
  @ValidateIf((o) => o.role === 'client')
  @IsNotEmpty()
  @IsNumber()
  totalDettes: number;

  @ApiProperty({
    description: 'Total debts paid by the user (required if role is client)',
    example: 500,
    required: false,
  })
  @ValidateIf((o) => o.role === 'client')
  @IsNotEmpty()
  @IsNumber()
  totalDettesPayee: number;

  @ApiProperty({
    description: 'Remaining debts of the user (required if role is client)',
    example: 500,
    required: false,
  })
  @ValidateIf((o) => o.role === 'client')
  @IsNotEmpty()
  @IsNumber()
  totalDettesRestant: number;
}
