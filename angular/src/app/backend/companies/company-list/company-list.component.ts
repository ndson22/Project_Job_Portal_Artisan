import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Company } from 'src/app/shared/models/company';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  companies!: Company[];

  constructor(
    private companyService: CompanyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.companyService.getAll().subscribe((companies: Company[]) => {
      this.companies = companies;
    });
  }

  onVertified(company: Company): void {
    this.companyService
      .changeVerify(company.id)
      .pipe(first())
      .subscribe(
        (res) => {
          company.verified_at = res.verified_at;
          this.toastr.success('Updated Successfully');
        },
        (err) => {
          this.toastr.error(err);
        }
      );
  }
}
