import { Injectable } from "@nestjs/common"; 
import { InjectRepository } from "@nestjs/typeorm"; 
import { User } from "src/auth/user.entity"; 
import { LineItemRepository } from "./lineitem.repository";
import { LineItemDTO } from "./lineitem.dto";
import { Transaction } from "../transaction.entity";

@Injectable()
export class LineItemService {
  constructor(
    @InjectRepository(LineItemRepository)
    private lineItemRepository: LineItemRepository
  ) {}

  async createLineItems(lineItemDto: LineItemDTO[], transaction: Transaction): Promise<void> {
    return this.lineItemRepository.createLineItems(lineItemDto, transaction);
  }
  
}
