import { TaskStatus } from '../tasks-status.enum'
import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class GetTaskFilterDTO{

    @IsOptional()
    @IsIn([TaskStatus.OPEN , TaskStatus.DONE , TaskStatus.IN_PROGRESS])
    status: TaskStatus;
    
    @IsOptional()
    @IsNotEmpty()
    search: string;
}