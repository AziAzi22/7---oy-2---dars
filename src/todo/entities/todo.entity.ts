import { Column, Model, Table } from "sequelize-typescript";

@Table({ timestamps: true })
export class Todo extends Model {
  @Column
  title: string;

  @Column
  isCompleted: boolean;
}
