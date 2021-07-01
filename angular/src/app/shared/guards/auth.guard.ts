import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable<boolean>((obs) => {
      this.userService.isAuthenticated().subscribe(
        (res) => {
          obs.next(true);
        },
        (err) => {
          this.toastr.error('You need to logged in first!');
          obs.next(false);
        }
      );
    });
  }
}
