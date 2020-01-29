import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"; 
  

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productCode: string;

  @Column()
  name: string;
     
  @Column()
  description: string;
 
  @Column()
  price: number;

}


