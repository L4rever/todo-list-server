// server/src/models/todo.model.ts
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Default,
    ForeignKey,
    BelongsTo, AllowNull,
} from 'sequelize-typescript';
import TodoList from './todoList.model';

export interface TodoAttributes {
    id: number;
    text: string;
    isCompleted: boolean;
    todoListId: number;
}

export interface TodoCreationAttributes
    extends Omit<TodoAttributes, 'id'> {}

/* ---------- модель ---------- */

@Table({ tableName: 'todos', timestamps: true })
export default class Todo
    extends Model<TodoAttributes, TodoCreationAttributes>
    implements TodoAttributes
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
    text!: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isCompleted!: boolean;

    @ForeignKey(() => TodoList)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    todoListId!: number;

    @BelongsTo(() => TodoList, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'todoListId'
    })
    todoList!: TodoList;
}
