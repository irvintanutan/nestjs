import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/tasks.entity';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/product/product.entity'; 
import { Transaction } from 'src/transaction/transaction.entity';
import { LineItem } from 'src/transaction/lineitem/lineitem.entity';

export const typeOrmConfig : TypeOrmModuleOptions = { 
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    entities: [Task, User , Product, Transaction, LineItem], 
    synchronize: true,
}
 