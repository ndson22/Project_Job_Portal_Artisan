import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from 'ngx-validators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-profile-user-detail',
  templateUrl: './profile-user-detail.component.html',
  styleUrls: ['./profile-user-detail.component.css'],
})
export class ProfileUserDetailComponent implements OnInit {
  changePasswordForm: FormGroup = this.fb.group(
    {
      current_password: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
    },
    {
      validators: PasswordValidators.mismatchedPasswords(
        'password',
        'password_confirmation'
      ),
    }
  );
  generalInfoForm!: FormGroup;
  isLoading = false;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user = this.userService.getUserFromLocalStorage();
    this.localStorageService.watchStorage().subscribe((res) => {
      this.userService.getUserFromLocalStorage();
    });
  }

  ngOnInit(): void {
    this.generalInfoForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  onSubmitGeneralInfo() {
    this.isLoading = true;
    this.userService.updateGeneralInfo(this.generalInfoForm.value).subscribe(
      (res) => {
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  onSubmitPassword() {
    this.isLoading = true;
    this.userService.updatePassword(this.changePasswordForm.value).subscribe(
      (res) => {
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
}
