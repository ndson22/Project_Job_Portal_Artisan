import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

const baseUrl = `${environment.backendUrl}`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrent(): Observable<User> {
    return this.http.get<User>(`${baseUrl}/users/current`);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}/users/${id}`);
  }
}
