import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface IRepository<T> {
  create(object: T): Promise<T>;
  update(object: T): Promise<void>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
}

@Injectable()
export class ProjectTypeOrmRepository implements IRepository<Project> {
  constructor(
    @InjectRepository(Project)
    private typeOrmRepo: Repository<Project>,
  ) {}

  async create(object: Project): Promise<Project> {
    return await this.typeOrmRepo.save(object);
  }
  async update(object: Project): Promise<void> {
    await this.typeOrmRepo.update(object.id, object);
  }
  async findAll(): Promise<Project[]> {
    return this.typeOrmRepo.find();
  }
  async findById(id: string): Promise<Project> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
}
