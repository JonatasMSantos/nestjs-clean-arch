import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/project.entity';

@Injectable()
export class CreateProject {
  execute(input: CreateProjectDto) {
    return new Project(input);
  }
}
