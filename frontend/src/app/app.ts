import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Todo {
  id: number;
  task: string;
  completed: number; 
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  todos: Todo[] = [];
  newTask: string = '';
  
  isLoading: boolean = true;

  activeView: 'all' = 'all'; 
  formVisible: boolean = false;
  editingId: number | null = null;
  editTitle: string = '';

  apiUrl = window.location.hostname.includes('github.dev')
    ? `https://${window.location.hostname.replace('4200', '3000')}`
    : 'http://localhost:3000';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.isLoading = true; 
    this.cdr.detectChanges();

    this.http.get<Todo[]>(`${this.apiUrl}/todos`).subscribe({
      next: (data) => {
        this.todos = data.map(t => ({
          ...t
        }));
        
        this.isLoading = false; 
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error("Erro ao carregar tarefas:", err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get filteredTodos(): Todo[] {
    return this.todos;
  }

  get totalCount() { 
    return this.todos.length; 
  }

  get doneCount() { 
    return this.todos.filter(t => t.completed === 1).length; 
  }

  toggleForm() {
    this.formVisible = !this.formVisible;
  }

  addTodo() {
    if (!this.newTask.trim()) return;
    
    const taskText = this.newTask.trim();
    const tempId = Date.now(); 
    const tempTodo: Todo = {
      id: tempId,
      task: taskText,
      completed: 0,
    };

    this.todos = [...this.todos, tempTodo];
    this.newTask = '';
    this.formVisible = false;
    this.cdr.detectChanges();

    const payload = { task: taskText, completed: 0 };
    this.http.post<Todo>(`${this.apiUrl}/todos`, payload).subscribe({
      next: (actualTodo) => {
        this.todos = this.todos.map(t => t.id === tempId ? { ...t, id: actualTodo.id } : t);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.todos = this.todos.filter(t => t.id !== tempId);
        this.cdr.detectChanges();
      }
    });
  }

  toggleTask(todo: Todo) {
    const oldStatus = todo.completed;
    const updatedStatus = todo.completed === 1 ? 0 : 1;
    
    todo.completed = updatedStatus;
    this.todos = [...this.todos];
    this.cdr.detectChanges();

    const payload = { id: todo.id, task: todo.task, completed: updatedStatus };

    this.http.put<Todo>(`${this.apiUrl}/todos/${todo.id}`, payload)
      .subscribe({
        error: (err) => {
          todo.completed = oldStatus;
          this.todos = [...this.todos];
          this.cdr.detectChanges();
        }
      });
  }

  deleteTask(id: number) {
    const backupTodos = [...this.todos];
    this.todos = this.todos.filter(t => t.id !== id);
    if (this.editingId === id) this.editingId = null;
    this.cdr.detectChanges();

    this.http.delete(`${this.apiUrl}/todos/${id}`)
      .subscribe({
        error: (err) => {
          this.todos = backupTodos;
          this.cdr.detectChanges();
        }
      });
  }

  startEdit(todo: Todo) {
    this.editingId = todo.id;
    this.editTitle = todo.task;
    this.cdr.detectChanges();
  }

  cancelEdit() {
    this.editingId = null;
    this.cdr.detectChanges();
  }

  saveEdit(todo: Todo) {
    if (!this.editTitle.trim()) return;

    const oldTitle = todo.task;
    const newTitle = this.editTitle.trim();

    todo.task = newTitle;
    this.editingId = null;
    this.cdr.detectChanges();

    const payload = { 
      id: todo.id, 
      task: newTitle, 
      completed: todo.completed 
    };
    
    this.http.put<Todo>(`${this.apiUrl}/todos/${todo.id}`, payload)
      .subscribe({
        error: (err) => {
          todo.task = oldTitle;
          this.todos = [...this.todos];
          this.cdr.detectChanges();
        }
      });
  }
}