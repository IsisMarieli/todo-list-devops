import { Component, OnInit } from '@angular/core';
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
  apiUrl = 'https://opulent-xylophone-74r5jr6rv3p57g-3000.app.github.dev';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<Todo[]>(`${this.apiUrl}/todos`).subscribe(data => {
      this.todos = data;
    });
  }

  addTodo() {
    if (!this.newTask.trim()) return;
    this.http.post<Todo>(`${this.apiUrl}/todos`, { task: this.newTask }).subscribe(todo => {
      this.todos.push(todo);
      this.newTask = '';
    });
  }
}
