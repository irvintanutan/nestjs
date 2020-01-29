import { IsNotEmpty, IsNumber, IsString } from 'class-validator' 
 
export class LineItemDTO{ 
    @IsString()
    @IsNotEmpty()
    productCode: string;
  
    @IsNumber()
    @IsNotEmpty()
    qty: number;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;
  
    @IsNumber()
    @IsNotEmpty()
    totalPrice: number; 
}