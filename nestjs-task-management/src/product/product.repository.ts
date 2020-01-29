import { Repository, EntityRepository } from "typeorm";
import { User } from "src/auth/user.entity";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { Product } from "./product.entity";
import { CreateProductDTO } from "./dto/create-product.dto";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const { productCode, name, description, price } = createProductDTO;

    const product = new Product();
    product.productCode = productCode;
    product.name = name;
    product.description = description;
    product.price = price;

    await product.save();

    return product;
  } 
  
  async getAllProduct(): Promise<Product[]> {
    return await this.find(); 
  }
}
