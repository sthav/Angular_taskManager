import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api/signUp'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  signUp(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };
    return this.http.post<any>(this.baseUrl, body, { headers });
  }
}
