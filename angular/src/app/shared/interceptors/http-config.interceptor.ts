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
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private router: Router, private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clonedReq = request.clone({
      withCredentials: true,
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return next.handle(clonedReq);
    // return next.handle(clonedReq).pipe(
    //   catchError((err) => {
    //     return this.handleError(err);
    //   })
    // );
  }

  // private handleError(err: HttpErrorResponse): Observable<any> {
  //   if (err.status === 401) {
  //     // this.cookieService.delete('sanctum_token', '/', 'localhost', true, 'Lax'); // Ko chay duoc
  //     this.router.navigateByUrl(`/login`);
  //     return of(err.message);
  //   }
  //   return throwError(err);
  // }
}
