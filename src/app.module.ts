import { Module } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.cfpmvycwrnhqndkpycou.supabase.co',
      port: 5432,
      username: 'postgres',
      password: '68t8HqmDQP8dZa',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
