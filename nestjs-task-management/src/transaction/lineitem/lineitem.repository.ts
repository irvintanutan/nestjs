import { Repository, EntityRepository } from "typeorm";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { LineItem } from "./lineitem.entity";
import { LineItemDTO } from "./lineitem.dto";
import { Transaction } from "../transaction.entity";

@EntityRepository(LineItem)
export class LineItemRepository extends Repository<LineItem> {
  async createLineItems(lineItems: LineItemDTO[], transaction: Transaction) {
    for (var i in lineItems) {
      const { productCode, qty, price , totalPrice } = lineItems[i];
      const lineitem = new LineItem();

      lineitem.price = price;
      lineitem.productCode = productCode;
      lineitem.qty = qty;
      lineitem.totalPrice = totalPrice;
      lineitem.transaction = transaction;
      await lineitem.save();
    }
  }
}
