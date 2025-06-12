import TodoDTO from "../types/todoDTO";
import Todo from "../models/todo.model";

class TodoService {
    async create(todo: TodoDTO) {
        return await Todo.create(todo);
    };
    private async get(query?: any) {
        if (!query) query = {};
        return await Todo.findAll({where: query})
    };
    async getById(id: number) {
        return await this.get({id});
    };
    async getByTodoListId(todoListId: number) {
        return await this.get({todoListId});
    }
    async update(id: number, todo: TodoDTO) {
        return await Todo.update(todo, {where: {id}});
    };
    async delete(id: number){
        return await Todo.destroy({where: {id}})
    };
}

export default new TodoService();