import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../shared/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (res) => {
          this.userService.user = new User(
            res.user.id,
            res.user.name,
            res.user.email
          );
          this.toastr.success('Success', 'Login Successfully!');
          this.router.navigate(['/']);
        },
        (err) => {
          this.toastr.error(err.message, 'Login Failed');
        }
      );
  }
}
