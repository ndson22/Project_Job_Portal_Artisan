import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';
import { UserService } from './user.service';

const baseUrl = `${environment.backendUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  register(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  logout(): void {
    this.http
      .post(`${baseUrl}/logout`, null)
      .pipe(first())
      .subscribe(
        () => {
          this.userService.authenticated = false;
          this.toastr.success('Logout Successfully!');
          this.router.navigate(['/']);
        },
        () => {
          this.toastr.error('Not logged in!');
        }
      );
  }

  registerCompany(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/register-company`, data);
  }
}
