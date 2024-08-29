import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Todo } from '../../types/todo.interface';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TodoComponent implements OnInit {
  @Input({ required: true }) todo!: Todo;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  todosService = inject(TodosService);

  editingText = '';

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  changeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo() {
    this.todosService.changeTodo(this.todo.id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTodoInEditMode() {
    this.setEditingId.emit(this.todo.id);
  }

  removeTodo() {
    this.todosService.removeTodo(this.todo.id);
  }
}
