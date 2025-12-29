import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('admins')
@Index('idx_admins_email', ['email'], { unique: true })
// @Index('idx_admins_deleted', ['isDeleted'])
export class Admin {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: 'varchar', length: 255, unique: true, default: '' })
  email: string = '';

  @Column({ type: 'varchar', length: 255, default: '' })
  password: string = '';

  @Column({ type: 'varchar', length: 255, default: '' })
  fullName: string = '';

  @Column({ type: 'varchar', length: 20, default: '' })
  phone: string = '';

  @Column({ type: 'varchar', length: 500, nullable: true, default: null })
  avatar: string | null = null;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean = false;

  @Column({ type: 'boolean', default: false })
  isDefault: boolean = false;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date = new Date();
}