import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
