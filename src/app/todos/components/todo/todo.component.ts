import { Component, Input } from '@angular/core';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
  standalone: true,
})
export class TodoComponent {
  @Input({ required: true }) todo!: Todo;
}
