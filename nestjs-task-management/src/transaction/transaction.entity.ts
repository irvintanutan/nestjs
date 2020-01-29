import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { User } from "src/auth/user.entity";
import { LineItem } from "./lineitem/lineitem.entity";

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  totalAmount: number;

  @Column()
  totalDiscount: number;

  @Column()
  totalCash: number;

  @OneToMany(type => LineItem, lineItem => lineItem.transaction, {eager:true})
  lineItem: LineItem[];

  @ManyToOne(
    type => User,
    user => user.transaction,
    { eager: false }
  )
  user: User;

  @Column()
  userId: number;
}
