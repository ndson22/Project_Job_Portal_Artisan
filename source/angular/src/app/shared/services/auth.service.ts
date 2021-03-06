import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { UserService } from './user.service';
import { Location } from '@angular/common';

const baseUrl = `${environment.backendUrl}`;
const frontendUrl = `${environment.frontendUrl}`;
const frontendSite = `http://localhost:4200/`;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private location: Location
  ) {}

  register(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<User>(`${baseUrl}/login`, data).pipe(
      map((res: User) => {
        if (res.email_verified_at === null) {
          this.localStorageService.removeItem('user');
          throw new Error('Your email is not verified yet!');
        }
        if (res.role.slug === 'company') {
          if (res.company.verified_at === null) {
            this.localStorageService.removeItem('user');
            throw new Error(
              'Your company is not verified by our team yet. Please be patient!!!'
            );
          }
        }

        this.localStorageService.setItem('user', JSON.stringify(res));
        return res;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  logout(): void {
    this.http
      .post(`${baseUrl}/logout`, null)
      .pipe(first())
      .subscribe(
        () => {
          this.localStorageService.removeItem('user');
          // this.toastr.success('Logout Successfully!');
          window.location.href = frontendSite;
          window.location.reload();
        },
        () => {
          this.toastr.error('Not logged in!');
        }
      );
  }

  logoutNotVerified(): void {
    this.http
      .post(`${baseUrl}/logout`, null)
      .pipe(first())
      .subscribe(
        () => {
          this.localStorageService.removeItem('user');
          this.router.navigateByUrl('/contact-us');
        },
        () => {
          this.toastr.error('Not logged in!');
        }
      );
  }

  registerCompany(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/register-company`, data);
  }

  verifyEmail(id: number): void {
    this.http
      .put(`${baseUrl}/verify-email`, { id: id })
      .pipe(first())
      .subscribe(
        (res) => {
          if (localStorage.hasOwnProperty('user')) {
            this.localStorageService.setItem('user', JSON.stringify(res));
          }
          this.toastr.success(
            'Please login to your account',
            'Your email is verified succesfully!'
          );
        },
        (err) => {
          this.toastr.error(err.error.message);
        }
      );

    if (localStorage.hasOwnProperty('user'))
      this.router.navigateByUrl('/profile');
  }
}
