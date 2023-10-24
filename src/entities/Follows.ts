import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Following {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  following_id: User;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  follower_id: User;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}

// following	id	PK	following_id	FK	follower_id	FK	created_at	date	created_by	FK	updated_at	date	updated_by	FK
