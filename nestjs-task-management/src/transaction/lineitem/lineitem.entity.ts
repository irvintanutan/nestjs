import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from "typeorm";
import { User } from "src/auth/user.entity"; 
import { Transaction } from "../transaction.entity";

@Entity()
export class LineItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  productCode: string;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  totalPrice: number;


  @ManyToOne(
    type => Transaction,
    transaction => transaction.lineItem,
    { eager: false }
  )
  transaction: Transaction;

  @Column()
  transactionId: number;
}
