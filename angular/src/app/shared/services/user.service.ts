import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

const baseUrl = `${environment.backendUrl}`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: User | undefined;
  authenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  isAuthenticated(): Observable<any> {
    return this.getCurrent().pipe(
      map((res) => {
        this.authenticated = true;
        this.user = res;
        console.log(this.user);
        return true;
      }),
      catchError((err) => {
        this.authenticated = false;
        this.user = undefined;
        return throwError(err);
      })
    );
  }

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
