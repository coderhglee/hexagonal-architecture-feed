import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class CatModel extends Model<CatModel> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  age: number;

  @Column
  breed: string;
}
