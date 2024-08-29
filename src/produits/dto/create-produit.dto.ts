import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProduitDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique identifier for the product',
    example: 1,
  })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name or label of the product',
    example: 'Laptop',
  })
  libelle: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'Quantity of the product in stock',
    example: 50,
  })
  quantite: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: 'Price of the product',
    example: 499.99,
  })
  prix: number;
}
