import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Company } from 'src/app/shared/models/company';
import { environment } from 'src/environments/environment.prod';
import { CompanyService } from 'src/app/shared/services/company.service';
import { ProvincesService } from 'src/app/shared/services/provinces.service';
import { Province } from 'src/app/shared/models/province';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
})
export class CompanyDetailComponent implements OnInit {
  companyForm!: FormGroup;
  isLoading = false;
  company!: Company;
  frontendUrl = `${environment.frontendUrl}/companies/`;
  storageUrl = environment.storageUrl;
  editedCompany!: Company;
  provinces!: Province[];


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private companyService: CompanyService,
    private provinceService: ProvincesService
  ) {
    this.company = this.userService.getUserFromLocalStorage().company;

    this.provinceService.getAll().subscribe((provinces: Province[]) => {
      this.provinces = provinces;
    });


  }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      id: [this.company.id, [Validators.required]],
      user_id: [
        this.company.user_id,
        [Validators.required, Validators.maxLength(100)],
      ],
      name: [
        this.company.name,
        [Validators.required, Validators.maxLength(100)],
      ],
      short_name: [
        this.company.short_name,
        [Validators.required, Validators.maxLength(5)],
      ],
      scale: [this.company.scale, [Validators.maxLength(1000)]],
      email: [
        this.company.email,
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      phone_number: [
        this.company.phone_number,
        [Validators.minLength(9), Validators.maxLength(11)],
      ],
      address: [
        this.company.address,
        [Validators.required, Validators.maxLength(255)],
      ],
      province_id: [
        this.company.province_id,
        [Validators.required, Validators.maxLength(2)],
      ],
      branch: [this.company.branch, [Validators.maxLength(255)]],
      map_link: [this.company.map_link, [Validators.maxLength(255)]],
      website: [this.company.website, [Validators.maxLength(255)]],
      facebook: [this.company.facebook, [Validators.maxLength(255)]],
      description: [this.company.description, [Validators.maxLength(1000)]],
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

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.editedCompany = info.file.response;
      this.toastr.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.toastr.error(`${info.file.name} file upload failed.`);
    }
  }
}
