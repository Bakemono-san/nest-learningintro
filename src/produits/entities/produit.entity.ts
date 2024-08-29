import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  libelle: string;

  @Column('int')
  quantite: number;

  @Column('decimal')
  prix: number;
}
