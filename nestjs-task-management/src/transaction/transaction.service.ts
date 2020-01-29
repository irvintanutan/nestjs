import { Injectable } from "@nestjs/common";
import { TransactionRepository } from "./transaction.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTransactionDTO } from "./dto/create-transaction.dto";
import { User } from "src/auth/user.entity";
import { Transaction } from "./transaction.entity";
import { LineItemDTO } from "./lineitem/lineitem.dto";
import { LineItemRepository } from "./lineitem/lineitem.repository";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
    @InjectRepository(LineItemRepository)
    private lineItemRepository: LineItemRepository
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDTO,
    user: User,
    lineItemDto: LineItemDTO[]
  ): Promise<Transaction> {
    const transaction = await this.transactionRepository.createTransaction(
      createTransactionDto,
      user
    );

    if (transaction){
      this.lineItemRepository.createLineItems(lineItemDto ,  transaction);
    }
      
    return transaction;
  }
}
