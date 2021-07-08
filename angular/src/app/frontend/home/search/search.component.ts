import { Router } from '@angular/router';
import { Job } from './../../../shared/models/job';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from './../../../shared/services/job.service';
import { Component, OnInit } from '@angular/core';
import { jobTypes } from 'src/app/shared/models/jobType';
import { JobProvinces } from 'src/app/shared/models/jobProvince';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    searchForm!: FormGroup;
    jobTypes!: jobTypes[];
    jobProvinces!: JobProvinces[];
  
    constructor(
      private jobService: JobService,
      private formBuilder: FormBuilder,
      private router: Router,
    ) { }
  
  
    ngOnInit(): void {
      this.searchForm = this.formBuilder.group({
        search: [''],
        job_type_id: [''],
        province_id: [''],
      });
      this.getJobTypes();
      this.getJobProvince();
    }
  
    search() {
      this.jobService.search(this.searchForm.value).subscribe(
        (res) => {
          this.jobService.jobPosts = res.jobPosts;
          this.jobService.searching = res.search;
          this.jobService.jobTypeId = res.jobTypeId;
          this.jobService.provinceId = res.provinceId;
          this.router.navigate(['jobs']);
        },
        (error) => {
        }
      );
    }
  
    getJobTypes() {
      this.jobService.getJobType().subscribe(
        (res: any) => {
          this.jobTypes = res;
        }
      )
    };
  
    getJobProvince() {
      this.jobService.getJobProvince().subscribe({
        next: (res: any) => {
          this.jobProvinces = res;
        }
      })
    };

}
