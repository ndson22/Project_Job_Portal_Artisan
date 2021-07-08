import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/models/company';
import { Job } from 'src/app/shared/models/job';
import { CompanyService } from 'src/app/shared/services/company.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-top-employers',
  templateUrl: './top-employers.component.html',
  styleUrls: ['./top-employers.component.css']
})
export class TopEmployersComponent implements OnInit {
    storageUrl = environment.storageUrl;
    jobPosts!: Job[];
    constructor(
      private companyService: CompanyService,
    ) { }
  
    ngOnInit(): void {
      this.getCompanyTop();
    }
  
    getCompanyTop() {
      this.companyService.getCompanyTop().subscribe(
        (res) => {
          this.jobPosts = res
        },
      );
    }

}
