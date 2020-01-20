import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDTO } from "./dto/get-task-filter.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskRepository } from "./tasks.repository";
import { Task } from "./tasks.entity";
import { TaskStatus } from "./tasks-status.enum";
import { TasksModule } from "./tasks.module";
import { User } from "src/auth/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTask(filterDto: GetTaskFilterDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id }
    });

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found!`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskByID(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({id , userId: user.id});

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found!`);
    }
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
