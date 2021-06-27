import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidators } from 'ngx-validators';

import { User } from 'src/app/shared/models/user';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile-user-detail',
  templateUrl: './profile-user-detail.component.html',
  styleUrls: ['./profile-user-detail.component.css'],
})
export class ProfileUserDetailComponent implements OnInit {
  currentUser!: User;
  userProfileForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: [''],
    password: [''],
    password_confirmation: [''],
  });
  changePasswordForm: FormGroup = this.fb.group(
    {
      password: [''],
      password_confirmation: [''],
    },
    {
      validators: PasswordValidators.mismatchedPasswords(
        'password',
        'password_confirmation'
      ),
    }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService
      .getCurrent()
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.currentUser = res;
          this.userProfileForm = this.fb.group({
            name: [res.name, Validators.required],
            email: [res.email],
          });
        },
        (err: any) => {
          this.currentUser = err;
          console.log(err);
        }
      );
  }

  onSubmitProfile() {}

  onSubmitPassword() {}
}
