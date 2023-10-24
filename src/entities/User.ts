import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Threads } from "./Thread";
import { Replies } from "./Replies";

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
  @Column()
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
}
// users	id	PK	username	varchar	full_name	varchar	email	varchar	password	varchar	photo_profile	varchar	bio	varchar	created_at	date	created_by	FK	updated_at	date	updaed_by	FKt