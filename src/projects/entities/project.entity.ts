import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import crypto from 'crypto';

export enum ProjectStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Entity()
export class Project {  
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, type: 'datetime' })
  started_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  cancelled_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  finished_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  forecasted_at: Date | null;

  @Column({ type: 'simple-enum' })
  status: ProjectStatus = ProjectStatus.PENDING;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      cancelled_at?: Date | null;
      forecasted_at?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();

    if (props?.started_at) {
      this.start(props.started_at);
    }
  }

  start(started_at: Date) {
    if (this.status == ProjectStatus.ACTIVE) {
      throw new Error('Cannot start activated project');
    }

    if (this.status === ProjectStatus.COMPLETED) {
      throw new Error('Cannot start completed project');
    }

    if (this.status === ProjectStatus.CANCELLED) {
      throw new Error('Cannot start cancelled project');
    }

    this.status = ProjectStatus.ACTIVE;
    this.started_at = started_at;
  }
}
