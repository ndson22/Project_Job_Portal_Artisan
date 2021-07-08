import { Router } from '@angular/router';
import { Job } from './../../../shared/models/job';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from './../../../shared/services/job.service';
import { Component, OnInit } from '@angular/core';
import { jobTypes } from 'src/app/shared/models/jobType';
import { JobProvinces } from 'src/app/shared/models/jobProvince';
@Component({
  selector: 'app-popular-search',
  templateUrl: './popular-search.component.html',
  styleUrls: ['./popular-search.component.css']
})
export class PopularSearchComponent implements OnInit {

  // searchForm!: FormGroup;
  jobTypes!: jobTypes[];
  jobProvinces!: JobProvinces[];

  constructor(
    private jobService: JobService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  searchForm = this.formBuilder.group({
    search: [''],
    job_type_id: [''],
    province_id: [''],
  });
  ngOnInit(): void {
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
    this.jobService.getJobProvinceSearch().subscribe({
      next: (res: any) => {
        this.jobProvinces = res;
      }
    })
  };

}
