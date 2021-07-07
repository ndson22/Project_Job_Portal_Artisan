import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clonedReq = request.clone({
      withCredentials: true,
      setHeaders: {
        // 'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // return next.handle(clonedReq);
    return next.handle(clonedReq).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    if ([401].indexOf(err.status) !== -1) {
      this.localStorageService.removeItem('user');
      if (window.location.pathname.startsWith('/backend')) {
        this.toastr.error('You need to logged in first!');
      }
      this.router.navigateByUrl('/login');
      return of(err.message);
    }
    if ([403].indexOf(err.status) !== -1) {
      this.toastr.error(
        'Please check your account info and/or permissions and try again!'
      );
    }

    return throwError(err);
  }
}
