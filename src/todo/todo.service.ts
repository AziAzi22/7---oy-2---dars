import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { title, isCompleted } = createTodoDto;

    return this.todoModel.create({ title, isCompleted });
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.todoModel.findAll();

    return todos;
  }

  async findOne(id: number): Promise<Todo> {
    const newID = Number(id);

    const foundedTodo = await this.todoModel.findByPk(newID);

    if (!foundedTodo) throw new NotFoundException("todo not found");

    return foundedTodo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const newID = Number(id);

    const foundedTodo = await this.todoModel.findByPk(newID);

    if (!foundedTodo) throw new NotFoundException("todo not found");

    await foundedTodo.update(updateTodoDto);

    return foundedTodo;
  }

  async remove(id: number): Promise<{ message: string }> {
    const newID = Number(id);

    const foundedTodo = await this.todoModel.findByPk(newID);

    if (!foundedTodo) throw new NotFoundException("todo not found");

    await foundedTodo.destroy();

    return { message: "todo deleted" };
  }
}
