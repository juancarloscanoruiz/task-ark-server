import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import * as moment from 'moment';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, minutes, seconds, status } = createTaskDto;
    const task = this.create({
      title,
      description,
      minutes,
      seconds,
      status,
    });

    await this.save(task);
    return task;
  }
}
