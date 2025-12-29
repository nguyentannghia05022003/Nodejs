import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Customer } from './Customer.entity';
import { OrderItem } from './OrderItem.entity';

export enum OrderStatus {
    // PENDING = 'pending',// Pending= 'PENDING'
    // CONFIRMED = 'confirmed',
    // SHIPPING = 'shipping',
    // DELIVERED = 'delivered',
    // CANCELLED = 'cancelled',

    Pending = 'PENDING',
    Confirmed = 'CONFIRMED',
    Shipping = 'SHIPPING',
    Delivered = 'DELIVERED',
    Cancelled = 'CANCELLED',
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    orderCode: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customerId' })
    customer: Customer;
    customerId?: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    totalAmount: number;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
    status: OrderStatus;

    @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
    items: OrderItem[];

    @Column({ default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}