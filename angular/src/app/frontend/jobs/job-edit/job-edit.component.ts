import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/shared/services/job.service';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  title! : string;
  jobTypes !: any;
  employeePositions !: any;
  typeOfEmployments !: any;
  genders !: any;
  updateForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    job_type_id: ['', [Validators.required]],
    from_salary: ['', [Validators.required]],
    to_salary: ['', [Validators.required]],
    employee_position_id: ['', [Validators.required]],
    experience: ['', [Validators.required]],
    type_of_employment_id: ['', [Validators.required]],
    expire: ['', [Validators.required]],
    description: ['', [Validators.required]],
    employee_quantity: ['', [Validators.required]],
    gender_id: ['', [Validators.required]],
  });
  id!: number
  job! : Job


  constructor(
    private routeActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getJobData();
    this.getJobDetail();
    
  }

  getJobData() {

    this.jobService.getJobInfor().subscribe({
      next: (res) => {
        this.jobTypes = res.jobTypes;
        this.employeePositions = res.employeePositions;
        this.typeOfEmployments = res.typeOfEmployments;
        this.genders = res.genders;  
      },

      error: (res) => {
        console.log(res);
      }
    });
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }
    
    this.jobService.update(this.id ,this.updateForm.value).subscribe({
      next: (res) => {
        console.log(res);
        // thong bao thanh cong
        this.toastr.success('Success', 'Update Successfully!');
      },
      error: () => {
        this.toastr.error('Error', 'Update Fail! Try again');
      }
    });
  }

  getJobDetail(){
    this.id = +this.routeActive.snapshot.paramMap.get("id")!;
    this.jobService.get(this.id).subscribe(
      (res: any)=> {
        this.updateForm.controls['title'].setValue(res.jobPost.title);
        this.updateForm.controls['description'].setValue(res.jobPost.description);
        this.updateForm.controls['from_salary'].setValue(res.jobPost.from_salary);
        this.updateForm.controls['to_salary'].setValue(res.jobPost.to_salary);
        this.updateForm.controls['expire'].setValue(res.jobPost.expire);
        this.updateForm.controls['experience'].setValue(res.jobPost.experience);
        this.updateForm.controls['employee_quantity'].setValue(res.jobPost.employee_quantity);
        this.updateForm.controls['type_of_employment_id'].setValue(res.jobPost.type_of_employment_id);
        this.updateForm.controls['employee_position_id'].setValue(res.jobPost.employee_position_id);
        this.updateForm.controls['gender_id'].setValue(res.jobPost.gender_id);
        this.updateForm.controls['job_type_id'].setValue(res.jobPost.job_type_id);


      }
    );
  }
  get getControl() {
    return this.updateForm.controls;
  }

}
