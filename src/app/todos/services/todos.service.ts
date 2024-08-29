import { Filter } from '../types/filter.enum';
import { Todo } from './../types/todo.interface';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSignal = signal<Todo[]>([]);
  filterSignal = signal<Filter>(Filter.all);

  changeFilter(filterName: Filter) {
    this.filterSignal.set(filterName);
  }

  addTodo(text: string) {
    const newTodo: Todo = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };

    this.todosSignal.update((todos) => [...todos, newTodo]);
  }

  changeTodo(id: string, text: string) {
    this.todosSignal.update((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text };
        }

        return todo;
      })
    );
  }

  removeTodo(id: string) {
    this.todosSignal.update((todos) => todos.filter((todo) => todo.id !== id));
  }
}
