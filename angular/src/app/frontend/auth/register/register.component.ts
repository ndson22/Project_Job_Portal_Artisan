import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { PasswordValidators } from 'ngx-validators';
import { Province } from 'src/app/shared/models/province';
import { ProvincesService } from 'src/app/shared/services/provinces.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  provinces!: Province[];
  isLoading: boolean = false;

  seekerForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
      password_confirmation: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
      password_confirmation: [
        '',
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ],
      company_name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      short_name: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
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
    this.isLoading = true;
    this.authService
      .register(this.seekerForm.value)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.toastr.success(
            'Please confirm your email and update your profile.',
            'Register Successfully'
          );
          this.router.navigate(['/login']);
        },
        (err: any) => {
          this.isLoading = false;
          const errorMessage =
            err.error.errors[Object.keys(err.error.errors)[0]];
          this.toastr.error(errorMessage, 'Failed To Register');
        }
      );
  }

  onSubmitCompany(): void {
    this.isLoading = true;
    this.authService
      .registerCompany(this.companyForm.value)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.toastr.success(
            'Please confirm your email and wait for admin to confirm your company information.',
            'Registered successfully'
          );
          this.router.navigate(['/login']);
        },
        (err: any) => {
          this.isLoading = false;
          this.toastr.error(err, 'Failed to register!');
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
