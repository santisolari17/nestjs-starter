import { User } from 'src/users/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  mileage: number;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
