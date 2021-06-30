import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

const baseUrl = `${environment.backendUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${baseUrl}/logout`, null);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${baseUrl}/profile`);
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${baseUrl}/is-authenticated`);
  }

  registerCompany(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/register-company`, data);
  }
}
