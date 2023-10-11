import { Injectable } from '@nestjs/common';
import { StartProjectDTO } from '../dto/start-project.dto';
import { Project } from '../entities/project.entity';

@Injectable()
export class StartProject {
  execute(input: StartProjectDTO, previous: Project) {
    previous.start(input.started_at);
    return previous;
  }
}
