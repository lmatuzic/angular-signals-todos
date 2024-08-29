import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  computed,
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
export class TodoComponent implements OnInit, OnChanges {
  @Input({ required: true }) todo!: Todo;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
  @ViewChild('textInput') textInput?: ElementRef;

  todosService = inject(TodosService);
  editingText = '';
  isAllTodosSelected = computed(() => {
    this.todosService.todosSignal().every((todo) => todo.isCompleted);
  });

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
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

  toggleTodo() {
    this.todosService.toggleTodo(this.todo.id);
  }

  toggleAllTodos(event: Event) {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }
}
