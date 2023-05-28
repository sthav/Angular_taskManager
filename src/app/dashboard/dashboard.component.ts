import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  newTask: any = {};

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => {
        console.error('Failed to retrieve tasks:', error);
      }
    );
  }

  createTask() {
    this.taskService.createTask(this.newTask).subscribe(
      (response) => {
        this.tasks.push(response);
        this.newTask = {};
      },
      (error) => {
        console.error('Failed to create task:', error);
      }
    );
  }

  updateTask(task: any) {
    this.taskService.updateTask(task._id, task).subscribe(
      (response) => {
        console.log('Task updated successfully:', response);
      },
      (error) => {
        console.error('Failed to update task:', error);
      }
    );
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task._id).subscribe(
      () => {
        this.tasks = this.tasks.filter((t) => t._id !== task._id);
      },
      (error) => {
        console.error('Failed to delete task:', error);
      }
    );
  }
}
