import { Entity, Column, PrimaryGeneratedColumn,ManyToOne ,JoinColumn  } from 'typeorm';
import {Users} from './users'

// primary column 主列
// column 主列
// ManyToOne 多对一关系

// 写个装饰器,name就是表名
@Entity()
export class User_auths {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  identity_type!: string;

  @Column()
  identifier!: string;

  @Column()
  credential!: string;

  
  @ManyToOne(() => Users,{
    cascade: true
  })
  @JoinColumn({name:'user_id'})
  users!:Users
}
