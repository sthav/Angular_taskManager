import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = '/api/tasks'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, task);
  }

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
