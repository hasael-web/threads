import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Threads } from "./Thread";

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user_id: User;
  @ManyToOne(() => Threads, (thread) => thread.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  thread_id: Threads;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}

// likes	id	PK	user_id	FK	thread_id	FK	created_at	date	created_by	FK	updated_at	date	updated_by	FK
