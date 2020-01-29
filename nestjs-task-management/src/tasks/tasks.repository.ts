import { Repository, EntityRepository } from "typeorm";
import { Task } from "./tasks.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks-status.enum";
import { GetTaskFilterDTO } from "./dto/get-task-filter.dto";
import { User } from "src/auth/user.entity";
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  private logger = new Logger('TaskRepository');

  async getTasks(filterDto: GetTaskFilterDTO, 
    user: User): Promise<Task[]> {

    const { status, search } = filterDto;
    const query = this.createQueryBuilder("task");

    query.where('task.userId = :userId' , {userId: user.id});

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    if (search) {
      query.andWhere(
        "task.title like :search or task.description like :search",
        { search: `%${search}%` }
      );
    }
    try {
      const tasks = query.getMany();
      return tasks;
    } catch (error){
      this.logger.error(`Failed to get task for user ${user.username} , 
      Filters: ${JSON.stringify(filterDto)}` , error.stack);
       throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;

    return task;
  }
}
 