import {TodoListDTO} from "../types/todoListDTO";
import TodoList from "../models/todoList.model";

class TodoListService {
    async create(todoList: TodoListDTO) {
        return await TodoList.create(todoList)
    }
    private async get(query?: any){
        query = query ? query : {};
        return await TodoList.findAll({where: query})
    }
    async update(id: number, todoList: TodoListDTO) {
        return await TodoList.update(todoList, {where: {id}});
    }
    async delete(id: number) {
        return await TodoList.destroy({where: {id}});
    }
    async getById(id: number) {
        return await this.get({id});
    }
    async getByUserId(userId: number) {
        return await this.get({userId});
    }
}

export default new TodoListService();