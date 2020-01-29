import { Repository, EntityRepository } from "typeorm";
import { User } from "src/auth/user.entity";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { Transaction } from "./transaction.entity";
import { CreateTransactionDTO } from "./dto/create-transaction.dto";

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {


  async createTransaction(createTransaction: CreateTransactionDTO, user: User): Promise<Transaction> {
    const { totalAmount, totalCash, totalDiscount } = createTransaction;
    const transaction = new Transaction();
    
    transaction.totalAmount = totalAmount;
    transaction.totalCash = totalCash;
    transaction.totalDiscount = totalDiscount;
    transaction.user = user;
    await transaction.save();

    delete transaction.user;

    return transaction;
  }
}
