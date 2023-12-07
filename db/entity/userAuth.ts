import { Entity, Column, PrimaryColumn,ManyToOne ,JoinColumn  } from 'typeorm';
import {Users} from './users'

// primary column 主列
// column 主列
// ManyToOne 多对一关系

// 写个装饰器,name就是表名
@Entity()
export class User_auths {
  @PrimaryColumn()
  readonly id!: number;


  @ManyToOne(() => Users)
  @JoinColumn()
  user_id!:Users

  @Column()
  identity_type!: string;

  @Column()
  identifier!: string;

  @Column()
  credential!: string;
}
