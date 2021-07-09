import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        ,
        Validators.minLength(5),
        Validators.maxLength(100),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(100)],
    ],
  });
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.router.url.startsWith('/verify-email/')) {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.authService.verifyEmail(+userId);
      }
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (res) => {
          // this.toastr.success('Success', 'Logged in successfully!');
          // this.location.back();
          // if (this.router.url.startsWith('/verify-email/')) {
          //   this.router.navigateByUrl('/');
          // }
          this.router.navigateByUrl('/');
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
          this.toastr.error('User not exist or wrong password', 'Login Failed');
        }
      );
  }
}
