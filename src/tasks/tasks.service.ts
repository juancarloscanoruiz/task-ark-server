import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return found;
  }

  async deleteTaskById(id: number): Promise<Task> {
    const foundTask = await this.getTaskById(id);
    const wasDeleted = await this.tasksRepository.delete(foundTask.id);
    if (wasDeleted.affected) {
      return foundTask;
    }
  }

  async updateTask(
    id: number,
    time: string,
    description: string,
  ): Promise<Task> {
    const foundTask = await this.getTaskById(id);
    foundTask.description = description;
    foundTask.time = time;
    await this.tasksRepository.save(foundTask);
    return foundTask;
  }
}
