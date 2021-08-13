import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.status.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getActiveTasks(): Promise<Task[]> {
    return this.tasksService.getActiveTasks();
  }

  @Get('/completed')
  getCompletedTasks(): Promise<Task[]> {
    return this.tasksService.getCompletedTasks();
  }

  @Get('/last-week')
  getTasksLastWeek(): Promise<Task[]> {
    return this.tasksService.getTasksLastWeek();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number): Promise<Task> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { title, minutes, seconds, description, status } = updateTaskDto;
    return this.tasksService.updateTask(
      id,
      title,
      minutes,
      seconds,
      description,
      status,
    );
  }

  @Patch('/status/:id')
  updateTaskStatus(
    @Param('id') id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
