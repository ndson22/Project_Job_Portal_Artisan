import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';

const backUrl = `${environment.backendUrl}`;
const frontUrl = `${environment.frontendUrl}`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: User | null;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isUser();
    this.localStorageService.watchStorage().subscribe((res) => {
      this.isUser();
    });
  }

  checkAuthenticated(): Observable<any> {
    return this.getUserFromServer().pipe(
      map((res) => {
        return true;
      }),
      catchError((err) => {
        this.toastr.error('Please try again!');
        return throwError(err);
      })
    );
  }

  isUser(): any {
    const userCheck = localStorage.hasOwnProperty('user');
    if (userCheck) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
    return userCheck;
  }

  isRole(slug: string): any {
    return this.isUser() && this.user?.role?.slug === slug;
  }

  isGuestOrSeeker(): any {
    if (!localStorage.hasOwnProperty('user')) {
      return true;
    } else {
      this.user = JSON.parse(localStorage.getItem('user')!);
      return this.user?.role?.slug === 'seeker';
    }
  }

  getUserFromServer(id?: number): Observable<User> {
    const url = id ? `${frontUrl}/users/${id}` : `${frontUrl}/users/`;
    return this.http.get<User>(url);
  }

  getUserFromLocalStorage(): any {
    this.user = JSON.parse(localStorage.getItem('user')!);
    return this.user;
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${backUrl}/users`);
  }

  updateGeneralInfo(data: any): Observable<any> {
    return this.http.put(`${frontUrl}/users/update/info`, data).pipe(
      map((res) => {
        this.localStorageService.setItem('user', JSON.stringify(res));
        this.toastr.success('General information is updated successfully!');
        return true;
      }),
      catchError((err) => {
        this.toastr.error('Please try again!');
        return throwError(err);
      })
    );
  }

  updatePassword(data: any): Observable<any> {
    return this.http.put(`${frontUrl}/users/update/password`, data).pipe(
      map((res) => {
        this.toastr.success('Password is updated successfully!');
        return true;
      }),
      catchError((err) => {
        this.toastr.error('Please try again!');
        return throwError(err);
      })
    );
  }
}
