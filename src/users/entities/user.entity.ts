import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'vendeur', 'client'],
    default: 'client',
  })
  role: 'admin' | 'vendeur' | 'client';

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  totalDettes: number;

  @Column({ nullable: true })
  totalDettesPayee: number;

  @Column({ nullable: true })
  totalDettesRestant: number;
}
