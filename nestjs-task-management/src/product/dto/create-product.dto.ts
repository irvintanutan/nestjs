import { IsNotEmpty, IsNumber } from 'class-validator' 
 
export class CreateProductDTO{

    @IsNotEmpty()
    productCode : string;

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    description : string;

    @IsNotEmpty()
    @IsNumber()
    price : number;

}