import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidators } from 'ngx-validators';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  candidateForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', Validators.required],
      agree: ['', [Validators.requiredTrue]],
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
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.authService
      .isAuthenticated()
      .pipe(first())
      .subscribe((res) => {
        if (res) {
          this.toastr.error('You are already logged in');
          this.location.back();
        }
      });
  }

  onSubmitCandidate() {
    this.authService
      .register(this.candidateForm.value)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.toastr.success(
            'Please confirm your email',
            'Register Successfully'
          );
          this.router.navigate(['/login']);
        },
        (err: any) => {
          this.toastr.error(err.message, 'Failed To Register');
        }
      );
  }
}
