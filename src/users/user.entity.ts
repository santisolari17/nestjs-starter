import { Report } from 'src/reports/report.entity';
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isAdmin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log(`Inserted id: ${this.id}`);
  }

  @AfterRemove()
  logRemoved() {
    console.log(`Removed id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdated() {
    console.log(`Updated id: ${this.id}`);
  }
}
