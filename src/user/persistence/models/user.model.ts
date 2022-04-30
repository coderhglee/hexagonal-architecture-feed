import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
} from 'sequelize-typescript';

@Table
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @CreatedAt
  createdAt: Date;
}
