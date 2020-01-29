import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Logger
} from "@nestjs/common";
import { CreateProductDTO } from "./dto/create-product.dto";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/auth/user.entity";
import { GetUser } from "src/auth/get-user.decorator";

@Controller("product")
@UseGuards(AuthGuard())
export class ProductController {
  private logger = new Logger("ProductController");

  constructor(private productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createProduct(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
    return this.productService.createProduct(createProductDTO);
  }

  @Get()
  getAllProduct(@GetUser() user: User): Promise<Product[]> {
    this.logger.log(user);
    return this.productService.getAllProduct();
  }
}
