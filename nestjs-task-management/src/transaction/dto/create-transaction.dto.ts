import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator' 
import { LineItemDTO } from '../lineitem/lineitem.dto';
import { Type } from 'class-transformer';
 
export class CreateTransactionDTO{

    @IsNotEmpty()
    @IsNumber()
    totalAmount : number;

    @IsNotEmpty()
    @IsNumber()
    totalDiscount : number;

    @IsNotEmpty()
    @IsNumber()
    totalCash : number;  
    
    // @Type(() => LineItemDTO)
    // @ValidateNested({ each: true })
    // public lineItems : LineItemDTO[];
    
}