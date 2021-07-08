import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import  { Job } from "../../../shared/models/job";
import  { JobService } from "../../../shared/services/job.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { jobTypes } from 'src/app/shared/models/jobType';
import { JobProvinces } from 'src/app/shared/models/jobProvince';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment.prod';



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
  jobSides!: Job[];
  experiences!: any;
  rangeSalary: number = 10000;
  storageUrl = environment.storageUrl;


  page = 1;
  count = 0;
  pageSize = 8;

  searchForm = this.formBuilder.group({
    search: [''],
    job_type_id: [''],
    province_id: [''],
    from_salary: [''],
    to_salary: [''],
    experience: this.formBuilder.array([]),
    title: this.formBuilder.array([]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private formBuilder: FormBuilder,
    public userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getJobTypes();
    this.getJobProvince();
    this.getJobExperiences();
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
    this.getJobSider()
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

  getJobExperiences() {
    this.jobService.getExperiences().subscribe(
      (res: any) => {
        this.experiences = res;
      }
    )
  };

  getJobSider() {
    this.jobService.getJobSider().subscribe(
      (res: any) => {
        this.jobSides = res;
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
    this.searchForm.controls['to_salary']?.setValue(this.rangeSalary);
    this.jobService.search(this.searchForm.value).subscribe(
      (res) => {
        console.log(res);
        this.jobs = res;
      },
      (error) => {
        this.toastr.error('Loading data fail');
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onTableDataChange(e:any){
    this.page = e;
  }

  onCheckExperienceChange(event: any) {
    const formArray: FormArray = this.searchForm.get('experience') as FormArray;

    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.search();
  }

  onCheckTitleChange(event: any) {
    const formArray: FormArray = this.searchForm.get('title') as FormArray;

    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.search();
  }
}
