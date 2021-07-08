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
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CompanyGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private nz: ToastrService,
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
      this.userService.getUserFromServer().subscribe(
        (user: User) => {
          if (user.role?.slug === 'company') {
            if (user.company.locked_at) {
              this.toastr.error(
                'Your company account is locked by our team, please contact us as soon as possible!'
              );
              this.router.navigate(['/contact-us']);
              obs.next(false);
            }
            console.log(user.company.verified_at === null);
            if (user.company.verified_at === null) {
              this.authService.logoutNotVerified();
              this.toastr.error(
                'Your company account is not verified by our team, please contact us as soon as possible!'
              );
              obs.next(false);
            }
            obs.next(true);
          } else {
            this.toastr.error('You are not company!');
            this.router.navigate(['/errors']);
            obs.next(false);
          }
        },
        (err) => {
          obs.next(false);
        }
      );
    });
  }
}
