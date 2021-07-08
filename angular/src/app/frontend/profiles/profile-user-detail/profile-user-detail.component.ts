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
import { environment } from 'src/environments/environment.prod';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-profile-user-detail',
  templateUrl: './profile-user-detail.component.html',
  styleUrls: ['./profile-user-detail.component.css'],
})
export class ProfileUserDetailComponent implements OnInit {
  frontendUrl = `${environment.frontendUrl}/users/`;
  storageUrl = environment.storageUrl;

  generalInfoForm!: FormGroup;
  changePasswordForm!: FormGroup;
  isLoading = false;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    public imageService: ImageService
  ) {
    this.user = this.userService.getUserFromLocalStorage();
    this.localStorageService.watchStorage().subscribe((res) => {
      this.user = this.userService.getUserFromLocalStorage();
    });
  }

  ngOnInit(): void {
    this.initGeneralInfoForm();
    this.initChangePasswordForm();
  }

  initGeneralInfoForm(): void {
    this.generalInfoForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  initChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group(
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
  }

  onSubmitGeneralInfo() {
    this.isLoading = true;
    this.userService.updateGeneralInfo(this.generalInfoForm.value).subscribe(
      (res) => {
        this.generalInfoForm.reset();
        this.initGeneralInfoForm();
      },
      (err) => {},
      () => {
        this.isLoading = false;
      }
    );
  }

  onSubmitPassword() {
    this.isLoading = true;
    this.userService.updatePassword(this.changePasswordForm.value).subscribe(
      (res) => {
        this.changePasswordForm.reset();
      },
      (err) => {},
      () => {
        this.isLoading = false;
      }
    );
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
      this.user = info.file.response;
      this.localStorageService.setItem('user', JSON.stringify(this.user));
      this.toastr.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.toastr.error(`${info.file.name} file upload failed.`);
    }
  }
}
