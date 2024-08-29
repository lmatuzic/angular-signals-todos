import { Todo } from './../types/todo.interface';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSignal = signal<Todo[]>([]);

  addTodo(text: string) {
    const newTodo: Todo = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };

    this.todosSignal.update((todos) => [...todos, newTodo]);
  }
}
