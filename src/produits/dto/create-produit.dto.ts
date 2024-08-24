import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProduitDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  libelle: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantite: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  prix: number;
}
