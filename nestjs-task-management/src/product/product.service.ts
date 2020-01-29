import {
  Injectable,
  NotFoundException,
  InternalServerErrorException
} from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDTO } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { LineItemDTO } from "src/transaction/lineitem/lineitem.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository
  ) {}

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    return this.productRepository.createProduct(createProductDTO);
  }

  async getAllProduct(): Promise<Product[]> {
    return this.productRepository.getAllProduct();
  }

  async getProductById(productCode: string)  {
    const found = await this.productRepository.findOne({
      where: { productCode: productCode }
    });

    if (!found) {
      console.log(found);
      throw new NotFoundException(
        `Product with  productCode ${productCode} not found!`
      );
    } 
  }
}
