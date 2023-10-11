import { FinishProjectDto } from './dto/finish-project.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CancelProject } from './use-cases/cancel.project';
import { CreateProject } from './use-cases/create-project';
import { FinishProject } from './use-cases/finish.project';
import { StartProject } from './use-cases/start.project';
import { IRepository } from './projects.repository';
import { Project } from './entities/project.entity';
import { StartProjectDTO } from './dto/start-project.dto';
import { CancelProjectDTO } from './dto/cancel-project.dto';

@Injectable()
export class ProjectsService {
  @Inject(CreateProject)
  private readonly createProject: CreateProject;

  @Inject(CancelProject)
  private readonly cancelProject: CancelProject;

  @Inject(FinishProject)
  private readonly finishProject: FinishProject;

  @Inject(StartProject)
  private readonly startProject: StartProject;

  constructor(
    @Inject('IRepository')
    private readonly projectRepo: IRepository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.createProject.execute(createProjectDto);
    return await this.projectRepo.create(project);
  }

  findAll() {
    return this.projectRepo.findAll();
  }

  findOne(id: string) {
    return this.projectRepo.findById(id);
  }

  async start(id: string, startProjectDTO: StartProjectDTO) {
    const previous = await this.projectRepo.findById(id);
    const merged = this.startProject.execute(startProjectDTO, previous);

    await this.projectRepo.update(merged);
    return merged;
  }

  async cancel(id: string, cancelProject: CancelProjectDTO) {
    const previous = await this.projectRepo.findById(id);
    const merged = this.cancelProject.execute(cancelProject, previous);

    await this.projectRepo.update(merged);
    return merged;
  }

  async finish(id: string, finishProjectDto: FinishProjectDto) {
    const previous = await this.projectRepo.findById(id);
    const merged = this.finishProject.execute(finishProjectDto, previous);

    await this.projectRepo.update(merged);
    return merged;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const previous = await this.projectRepo.findById(id);

    updateProjectDto.name && (previous.name = updateProjectDto.name);
    updateProjectDto.description &&
      (previous.name = updateProjectDto.description);

    await this.projectRepo.update(previous);
    return previous;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
