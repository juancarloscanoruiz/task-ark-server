import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, time, status } = createTaskDto;
    const task = this.create({
      title,
      description,
      time,
      status,
    });

    await this.save(task);
    return task;
  }
}
