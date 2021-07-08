import { AuthService } from '../services/auth.service';
import { first, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

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
      this.userService.checkAuthenticated().subscribe(
        (res: boolean) => {
          obs.next(res);
        },
        (err: any) => {
          obs.next(false);
        }
      );
    });
  }
}
