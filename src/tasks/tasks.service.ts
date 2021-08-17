import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import * as moment from 'moment';
import { Between, MoreThan } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  async getActiveTasks(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({ where: { status: false } });
    return tasks;
  }

  async getCompletedTasks(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({ where: { status: true } });
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
    title: string,
    minutes: number,
    seconds: number,
    description: string,
    status: boolean,
  ): Promise<Task> {
    const foundTask = await this.getTaskById(id);
    foundTask.title = title;
    foundTask.description = description;
    foundTask.seconds = seconds;
    foundTask.minutes = minutes;
    foundTask.status = status;
    await this.tasksRepository.save(foundTask);
    return foundTask;
  }

  async updateTaskStatus(id: number, status: boolean): Promise<Task> {
    const foundTask = await this.getTaskById(id);
    foundTask.status = status;
    await this.tasksRepository.save(foundTask);
    return foundTask;
  }

  getDay(day): string {
    let nameDay = '';
    switch (day) {
      case 0:
        nameDay = 'Domingo';
        break;
      case 1:
        nameDay = 'Lunes';
        break;
      case 2:
        nameDay = 'Martes';
        break;
      case 3:
        nameDay = 'Miércoles';
        break;
      case 4:
        nameDay = 'Jueves';
        break;
      case 5:
        nameDay = 'Viernes';
        break;
      case 6:
        nameDay = 'Sábado';
        break;
      default:
        break;
    }
    return nameDay;
  }

  async getTasksLastWeek(): Promise<Task[]> {
    const currentDate = moment().utc().format('YYYY-MM-DD');
    const olderDate = moment().utc().subtract(7, 'days').format('YYYY-MM-DD');
    const olderDateCopy = moment().subtract(7, 'days');
    const tasksLastWeek: any[] = [];
    const tasks = await this.tasksRepository.find({
      updated_at: MoreThan(olderDate),
      status: true,
    });
    while (true) {
      olderDateCopy.add(1, 'days');
      if (olderDateCopy.isAfter(currentDate, 'day')) {
        break;
      }
      let counter = 0;
      for (const task of tasks) {
        const taskUpdateDate = moment(task.updated_at).subtract(5, 'hours');
        if (taskUpdateDate.isSame(olderDateCopy, 'day')) {
          counter += 1;
        }
      }
      tasksLastWeek.push({
        value: counter,
        day: `${this.getDay(olderDateCopy.day())} - ${olderDateCopy.date()}`,
      });
      counter = 0;
    }
    return tasksLastWeek;
  }
}
