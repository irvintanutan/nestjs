import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionRepository } from "./transaction.repository";
import { LineItemRepository } from "./lineitem/lineitem.repository";
import { LineItemService } from "./lineitem/lineitem.service";
import { ProductService } from "src/product/product.service";
import { ProductRepository } from "src/product/product.repository";

@Module({
  imports: [TypeOrmModule.forFeature([TransactionRepository, LineItemRepository, 
  ProductRepository]), AuthModule],
  providers: [TransactionService, LineItemService, ProductService],
  controllers: [TransactionController]
})
export class TransactionModule {}
