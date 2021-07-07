import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Company } from 'src/app/shared/models/company';
import { Province } from 'src/app/shared/models/province';
import { CompanyService } from 'src/app/shared/services/company.service';
import { ProvincesService } from 'src/app/shared/services/provinces.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  frontendUrl = `${environment.frontendUrl}/companies/`;
  storageUrl = environment.storageUrl;

  companyForm!: FormGroup;
  companies!: Company[];
  provinces!: Province[];
  editedCompany!: Company;
  companyFormStatus = {
    visible: false,
    loading: false,
  };

  searchVisible: boolean = false;
  searchValue: string = '';
  // listOfColumn = [
  //   {
  //     title: 'Chinese Score',
  //     compare: (a: Company, b: Company) => a.name - b.name,
  //     priority: 3,
  //   },
  // ];
  fileList: NzUploadFile[] = [];
  listOfDisplayData!: Company[];
  listOfSorts: any = {
    province: {
      sortOrder: null,
      sortFn: (a: Company, b: Company) =>
        a.province.name.localeCompare(b.province.name),
      sortDirections: ['ascend', 'descend', null],
    },
  };

  constructor(
    private companyService: CompanyService,
    private provinceService: ProvincesService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private changeDetection: ChangeDetectorRef
  ) {
    this.updateCompaniesData();
    this.provinceService.getAll().subscribe((provinces: Province[]) => {
      this.provinces = provinces;
    });
  }

  ngOnInit(): void {}

  updateCompaniesData(): void {
    this.companyService.getAll().subscribe((companies: Company[]) => {
      this.companies = companies;
      this.listOfDisplayData = [...this.companies];
    });
  }
  onVerify(company: Company): void {
    company.verifyLoading = true;
    this.companyService
      .changeVerify(company)
      .pipe(first())
      .subscribe(
        (res) => {
          company.verified_at = res.verified_at;
          this.toastr.success(
            'Email has been sent to the company.',
            'Updated successfully!'
          );
        },
        (err) => {
          this.toastr.error(err.statusText);
        },
        () => {
          company.verifyLoading = false;
        }
      );
  }

  onLock(company: Company): void {
    company.lockLoading = true;
    this.companyService
      .changeLock(company)
      .pipe(first())
      .subscribe(
        (res) => {
          company.locked_at = res.locked_at;
          this.toastr.success('Updated successfully!');
        },
        (err) => {
          this.toastr.error(err.statusText);
        },
        () => {
          company.lockLoading = false;
        }
      );
  }

  onSponsor(company: Company): void {
    company.sponsorLoading = true;
    this.companyService
      .changeSponsor(company)
      .pipe(first())
      .subscribe(
        (res) => {
          company.sponsored_at = res.sponsored_at;
          this.toastr.success('Updated successfully!');
        },
        (err) => {
          this.toastr.error(err.statusText);
        },
        () => {
          company.sponsorLoading = false;
        }
      );
  }

  showEditModal(company: Company): void {
    this.editedCompany = company;
    this.companyFormStatus.visible = true;
    this.companyForm = this.fb.group({
      id: [company.id, [Validators.required]],
      user_id: [
        company.user_id,
        [Validators.required, Validators.maxLength(100)],
      ],
      name: [company.name, [Validators.required, Validators.maxLength(100)]],
      short_name: [
        company.short_name,
        [Validators.required, Validators.maxLength(5)],
      ],
      scale: [company.scale, [Validators.maxLength(1000)]],
      email: [
        company.email,
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      phone_number: [company.phone_number, [Validators.pattern('^[0-9]{10}$')]],
      address: [
        company.address,
        [Validators.required, Validators.maxLength(255)],
      ],
      province_id: [
        company.province_id,
        [Validators.required, Validators.maxLength(2)],
      ],
      branch: [company.branch, [Validators.maxLength(255)]],
      map_link: [company.map_link, [Validators.maxLength(255)]],
      website: [company.website, [Validators.maxLength(255)]],
      facebook: [company.facebook, [Validators.maxLength(255)]],
      description: [company.description, [Validators.maxLength(1000)]],
    });
  }

  handleOk(): void {
    this.companyFormStatus.loading = true;
    const data = this.companyForm.value;
    this.companyService
      .update(data)
      .pipe(first())
      .subscribe(
        (company: Company) => {
          // const foundIndex = this.companies.findIndex((x) => x.id == data.id);
          this.updateCompaniesData();
          this.companyFormStatus.visible = false;
          this.companyForm.markAsPristine();
          this.toastr.success('Updated successfully!');
        },
        (err) => {
          this.toastr.error('Please try again!');
        },
        () => {
          this.companyFormStatus.loading = false;
        }
      );
  }

  handleCancel(): void {
    this.companyFormStatus.visible = false;
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(info.file.response);

      this.editedCompany = info.file.response;
      this.updateCompaniesData();
      this.toastr.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.toastr.error(`${info.file.name} file upload failed.`);
    }
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.searchVisible = false;
    this.listOfDisplayData = this.companies.filter((company: Company) =>
      company.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }
}
