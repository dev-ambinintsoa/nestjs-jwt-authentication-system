import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.role, { onDelete: 'CASCADE' })
  users: User[];
}
