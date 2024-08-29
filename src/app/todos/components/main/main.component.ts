import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { CommonModule } from '@angular/common';
import { Filter } from '../../types/filter.enum';
import { TodosComponent } from '../../todos.component';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [CommonModule, TodosComponent, TodoComponent],
})
export class MainComponent {
  todosService = inject(TodosService);

  visibleTodos = computed(() => {
    const todos = this.todosService.todosSignal();
    const filter = this.todosService.filterSignal();

    if (filter === Filter.all) {
      return todos.filter((todo) => !todo.isCompleted);
    }

    if (filter === Filter.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }

    return todos;
  });
}
