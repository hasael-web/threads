import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Replies } from "./Replies";

@Entity({ name: "threads" })
export class Threads {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  content: string;
  @Column({ nullable: true })
  image: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  
  @OneToMany(() => Replies, (replie) => replie.thread_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  number_of_replies: Replies[];


  @ManyToOne(() => User, (user) => user.threads, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  create_by: User;
}

// threads	id	PK	content	varchar	image	varchar	number_of_replies	FK	created_at	date	created_by	FK	updated_at	date	updated_by	FK
