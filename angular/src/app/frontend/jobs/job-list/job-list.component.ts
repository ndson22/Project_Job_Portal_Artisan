import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import  { Job } from "../../../shared/models/job";
import  { JobService } from "../../../shared/services/job.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { jobTypes } from 'src/app/shared/models/jobType';
import { JobProvinces } from 'src/app/shared/models/jobProvince';



@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  jobs!: Job[];
  jobTypes!: jobTypes[];
  jobProvinces!: JobProvinces[];

  page = 1;
  count = 0;
  pageSize = 5;

  searchForm = this.formBuilder.group({
    search: [''],
    job_type_id: [null],
    province_id: [null],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public jobService: JobService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getJobTypes();
    this.getJobProvince();
    if (this.jobService.flag) {
      this.jobs = this.jobService.jobPosts;
      this.searchForm.controls['search']?.setValue(this.jobService.searching);
      this.searchForm.controls['job_type_id']?.setValue(this.jobService.jobTypeId);
      this.searchForm.controls['province_id']?.setValue(this.jobService.provinceId);
    } else {
      this.getAllPost()
    }
    this.jobService.flag = false;
  }

  getAllPost() {
   this.subscription = this.jobService.getAll().subscribe({
      next: (res) => {
        this.jobs = res;
        console.log(this.jobs);

      },
      error: (res) => {
        this.router.navigate(['error']);
      }
    });
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

  toContact()
  {
    document.getElementById("apply_scroll")?.scrollIntoView({
      behavior:"smooth"
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onTableDataChange(e:any){
    this.page = e;
    console.log(e);
  }

}
