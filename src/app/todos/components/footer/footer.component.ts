import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Filter } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  todosService = inject(TodosService);

  filterSignal = this.todosService.filterSignal;
  filterEnum = Filter;

  activeTodosCount = computed(() => {
    return this.todosService.todosSignal().filter((todo) => !todo.isCompleted)
      .length;
  });

  noTodosClass = computed(() => {
    this.todosService.todosSignal().length === 0 ? 'hidden' : '';
  });

  itemsLeftText = computed(() => {
    return `item${this.activeTodosCount() !== 1 ? 's' : ''} left`;
  });

  changeFilter(event: Event, filterName: Filter) {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
    console.log('after change filter:', this.todosService.filterSignal());
  }
}
