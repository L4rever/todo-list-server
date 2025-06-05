// server/src/models/todoList.model.ts
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany, BelongsTo, ForeignKey,
} from 'sequelize-typescript';
import { Todo } from './todo.model';
import {User} from "./user.model";

/* ---------- типы ---------- */

export interface TodoListAttributes {
    id: number;
    name: string;
    userId: number;
}

export interface TodoListCreationAttributes
    extends Omit<TodoListAttributes, 'id'> {}

/* ---------- модель ---------- */

@Table({ tableName: 'todo_lists', timestamps: true })
export class TodoList
    extends Model<TodoListAttributes, TodoListCreationAttributes>
    implements TodoListAttributes
{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        validate: { notEmpty: true },
    })
    name!: string;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => Todo, { onDelete: 'CASCADE' })
    todos!: Todo[];
}
