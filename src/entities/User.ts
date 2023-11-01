import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Threads } from "./Thread";
import { Replies } from "./Replies";
import { Following } from "./Follows";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  username: string;
  @Column({ nullable: false })
  full_name: string;

  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  photo_profile: string;
  @Column()
  bio: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
  @OneToMany(() => Threads, (thread) => thread.create_by, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  threads: Threads[];
  @OneToMany(() => Following, (follower) => follower.follower_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  following: Following[];

  @OneToMany(() => Following, (follower) => follower.following_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  follower: Following[];
}
// users	id	PK	username	varchar	full_name	varchar	email	varchar	password	varchar	photo_profile	varchar	bio	varchar	created_at	date	created_by	FK	updated_at	date	updaed_by	FKt
