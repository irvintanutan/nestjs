import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes, 
  ParseIntPipe,
  UseGuards,
  Logger,
  ValidationPipe,
  NotFoundException, 
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { CreateTransactionDTO } from "./dto/create-transaction.dto";
import { Transaction } from "./transaction.entity";
import { TransactionService } from "./transaction.service";
import { LineItemService } from "./lineitem/lineitem.service";
import { Any } from "typeorm";
import { LineItemDTO } from "./lineitem/lineitem.dto";
import { ProductService } from "src/product/product.service";
import { Product } from "src/product/product.entity";  

@Controller("transaction")
@UseGuards(AuthGuard())
export class TransactionController {
  private logger = new Logger("TransactionController");

  constructor(
    private transactionService: TransactionService,
    private lineItemService: LineItemService,
    private readonly productService: ProductService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createNewTransaction(
    @Body() transactionDto: CreateTransactionDTO, 
    @Body("lineItems") lineItemDto: LineItemDTO[],
    @GetUser() user: User
  ): Promise<Transaction> {

    for (var i in lineItemDto) { 
      this.productService.getProductById(lineItemDto[i].productCode.toString());
    }
    return this.transactionService.createTransaction(transactionDto, user , lineItemDto);
  }
}
