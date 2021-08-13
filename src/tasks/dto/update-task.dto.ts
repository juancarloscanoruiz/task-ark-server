import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  title: string;
  description: string;
  seconds: number;
  minutes: number;
}
