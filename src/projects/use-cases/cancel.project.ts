import { Injectable } from '@nestjs/common';
import { Project, ProjectStatus } from '../entities/project.entity';
import { CancelProjectDTO } from '../dto/cancel-project.dto';

@Injectable()
export class CancelProject {
  execute(input: CancelProjectDTO, previous: Project) {
    if (previous.status === ProjectStatus.COMPLETED) {
      throw new Error('Cannot cancel completed project');
    }

    if (previous.status === ProjectStatus.CANCELLED) {
      throw new Error('Cannot cancel cancelled project');
    }

    if (input.cancelled_at < previous.started_at) {
      throw new Error('Cannot cancel project before it started');
    }

    previous.cancelled_at = input.cancelled_at;
    previous.status = ProjectStatus.CANCELLED;

    return previous;
  }
}
