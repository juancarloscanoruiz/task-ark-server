import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  seconds: number;

  @IsNotEmpty()
  minutes: number;
}
