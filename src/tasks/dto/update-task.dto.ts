import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  time: string;
}
