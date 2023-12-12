import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// primary column 主列
// column 主列

// 写个装饰器,name就是表名
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  nickname!: string;

  @Column()
  avatar!: string;

  @Column()
  job!: string;

  @Column()
  introduce!: string;
}
