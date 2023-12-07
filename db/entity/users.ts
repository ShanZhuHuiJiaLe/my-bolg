import { Entity, Column, PrimaryColumn } from 'typeorm';

// primary column 主列
// column 主列

// 写个装饰器,name就是表名
@Entity()
export class Users {
  @PrimaryColumn()
  readonly id!: number;

  @Column()
  nickname!: string;

  @Column()
  avatar!: string;

  @Column()
  job!: string;

  @Column()
  introduce!: number;
}
