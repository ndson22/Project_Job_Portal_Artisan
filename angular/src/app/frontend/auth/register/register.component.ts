import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidators } from 'ngx-validators';

import { AuthService } from '../../../shared/services/auth.service';
import { ProvincesService } from 'src/app/shared/services/provinces.service';
import { Province } from 'src/app/shared/models/province';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  provinces!: Province[];

  seekerForm: FormGroup = this.fb.group(
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
  companyForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', Validators.required],

      company_name: ['', [Validators.required]],
      short_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      province_id: ['', [Validators.required]],

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
    private authService: AuthService,
    private userService: UserService,
    private provinceService: ProvincesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProvincesData();
  }

  getProvincesData(): void {
    this.provinceService
      .getAll()
      .pipe(first())
      .subscribe((res) => {
        this.provinces = res;
      });
  }

  onSubmitSeeker(): void {
    this.authService
      .register(this.seekerForm.value)
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

  onSubmitCompany(): void {
    this.authService
      .registerCompany(this.companyForm.value)
      .pipe(first())
      .subscribe(
        (res: any) => {
          console.log(res);
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

  checkErrors(): void {
    Object.keys(this.companyForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        this.companyForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }
}
