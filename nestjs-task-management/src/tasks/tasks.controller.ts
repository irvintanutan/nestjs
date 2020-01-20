import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDTO } from "./dto/get-task-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation-pipe";
import { Task } from "./tasks.entity";
import { TaskStatus } from "./tasks-status.enum";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger("TaskController");

  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDTO: GetTaskFilterDTO,
    @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.username} retrieving all tasks. Filters : ${JSON.stringify(
        filterDTO
      )}`
    );
    return this.taskService.getTask(filterDTO, user);
  }

  @Get(":id")
  getTaskByID(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Delete(":id")
  deleteTaskByID(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.taskService.deleteTaskByID(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(
    @Body() createTaskDto: CreateTaskDTO,
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(
      `User ${user.username} creating new task. Data: ${JSON.stringify(
        createTaskDto
      )}`
    );

    return this.taskService.createTask(createTaskDto, user);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe)
    status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
