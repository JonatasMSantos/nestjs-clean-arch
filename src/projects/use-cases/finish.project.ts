import { Injectable } from '@nestjs/common';
import { Project, ProjectStatus } from '../entities/project.entity';
import { FinishProjectDto } from '../dto/finish-project.dto';

@Injectable()
export class FinishProject {
  execute(input: FinishProjectDto, previous: Project) {
    if (previous.status === ProjectStatus.COMPLETED) {
      throw new Error('Cannot finished completed project');
    }

    if (previous.status === ProjectStatus.CANCELLED) {
      throw new Error('Cannot finished cancelled project');
    }

    if (input.finished_at < previous.started_at) {
      throw new Error('Cannot finished project before it started');
    }

    previous.finished_at = input.finished_at;
    previous.status = ProjectStatus.COMPLETED;

    return previous;
  }
}
