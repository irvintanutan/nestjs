import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../tasks-status.enum'

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS
  ];

  transform(value: any) {
    value = value.toUpperCase();
    
    if (!this.isStatusSatisfied(value)){
        throw new BadRequestException(`${value} is an invalid status`);
    }
    
    return value;
  }

  private isStatusSatisfied(status: any){
      const idx = this.allowedStatuses.indexOf(status);
      return idx !== -1;
  }
}
