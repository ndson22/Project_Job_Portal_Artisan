import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
})
export class CompanyDetailComponent implements OnInit {
  companyForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    short_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    province_id: ['', [Validators.required]],
    phone_number: ['', [Validators.required]],
    image: ['', [Validators.required]],
    description: ['', [Validators.required]],
    facebook: ['', [Validators.required]],
    website: ['', [Validators.required]],
    map_link: ['', [Validators.required]],
    branch: ['', [Validators.required]],
  });
  isLoading = false;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required]],
      short_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      province_id: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      website: ['', [Validators.required]],
      map_link: ['', [Validators.required]],
      branch: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.userService.updateGeneralInfo(this.companyForm.value).subscribe(
      (res) => {
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
}
