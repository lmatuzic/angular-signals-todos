import { Filter } from '../types/filter.enum';
import { Todo } from './../types/todo.interface';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSignal = signal<Todo[]>([]);
  filterSignal = signal<Filter>(Filter.all);

  addTodo(text: string) {
    const newTodo: Todo = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };

    console.log('todosSignal', this.todosSignal());

    this.todosSignal.update((todos) => [...todos, newTodo]);
  }
}
