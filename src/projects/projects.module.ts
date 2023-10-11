import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { CreateProject } from './use-cases/create-project';
import { CancelProject } from './use-cases/cancel.project';
import { FinishProject } from './use-cases/finish.project';
import { StartProject } from './use-cases/start.project';
import { ProjectTypeOrmRepository } from './projects.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    CreateProject,
    CancelProject,
    FinishProject,
    StartProject,
    ProjectTypeOrmRepository,
    {
      provide: 'IRepository',
      useExisting: ProjectTypeOrmRepository,
    },
  ],
})
export class ProjectsModule {}
