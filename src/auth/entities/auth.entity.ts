import { Optional } from "sequelize";
import { Table, Model, Column } from "sequelize-typescript";

interface AuthAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

type AuthCreatonAttributes = Optional<AuthAttributes, "id">;

@Table({ timestamps: true })
export class Auth extends Model<AuthAttributes, AuthCreatonAttributes> {
  @Column({ allowNull: false, defaultValue: "ali" })
  username: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;
}
