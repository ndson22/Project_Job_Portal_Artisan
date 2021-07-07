import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import  { Job } from "../../../shared/models/job";
import  { JobService } from "../../../shared/services/job.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { jobTypes } from 'src/app/shared/models/jobType';
import { JobProvinces } from 'src/app/shared/models/jobProvince';
import { UserService } from 'src/app/shared/services/user.service';




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
  jobSalary! : Job[];

  searchForm = this.formBuilder.group({
    search: [''],
    job_type_id: [null],
    province_id: [null],
    from_salary: [''],
    to_salary: [''],
    experience: ['']
  });

  searchFormFilter = this.formBuilder.group({
    search: [''],
    experience: ['']
  });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private formBuilder: FormBuilder,
    public userService: UserService
  ) { }

  ngOnInit(): void {

    this.getJobTypes();
    this.getJobProvince();
    this.getMinSalary();
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

  getMinSalary(){
    this.jobService.getMinSalary().subscribe({
      next:(res: any) => {
        this.jobSalary = res;
      }
    });
   }

  search()
  {
    this.jobService.search(this.searchForm.value).subscribe(
      (res) => {
        this.jobService.jobPosts = res.jobPosts;
        this.jobService.searching = res.search;
        this.jobService.jobTypeId = res.jobTypeId;
        this.jobService.provinceId = res.provinceId;
        this.jobs = res.jobPosts;
      },
      (error) => {
      }
    );
  }

  searchFilter()
  {
    console.log(this.searchFormFilter.value)
    this.jobService.searchFilter(this.searchFormFilter.value).subscribe(
      (res) => {
        console.log(res)
        this.jobService.searching = res.search;
        this.jobService.jobPosts = res.jobPosts;
        this.jobs = res.jobPosts;
        console.log(this.jobs)
      },
      (error) => {
      }
    );

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
