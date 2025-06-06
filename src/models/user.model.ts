import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
} from 'sequelize-typescript';
import TodoList from "./todoList.model";

export interface UserAttributes {
    id: number;
    login: string;
    password: string;
}

export interface UserCreateAttributes
    extends Omit<UserAttributes, 'id'> {}

@Table({tableName:'users', timestamps: true})
export default class User
    extends Model<UserAttributes, UserCreateAttributes>
    implements UserAttributes
{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
    })
    login!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: { notEmpty: true },
    })
    password!: string;

    @HasMany(() => TodoList)
    todoLists!: TodoList[];
}