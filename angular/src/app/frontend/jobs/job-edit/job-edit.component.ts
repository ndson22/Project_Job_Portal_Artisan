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
  updateForm !: FormGroup;
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
    this.updateForm = this.formBuilder.group({
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
  }

  getJobData() {
    this.id = +this.routeActive.snapshot.paramMap.get("id")!;

    this.jobService.getJobInfor().subscribe({
      next: (res) => {
        this.jobTypes = res.jobTypes;
        this.employeePositions = res.employeePositions;
        this.typeOfEmployments = res.typeOfEmployments;
        this.genders = res.genders;
        this.job = res;
        // this.updateForm.patchValue({
        //   title: this.job.title,
        //   job_type_id: this.job.jobTypes,
        //   from_salary: this.job.from_salary,
        //   to_salary: this.job.to_salary,
        //   employee_position_id: this.job.employeePositions,
        //   experience: this.job.experience,
        //   type_of_employment_id: this.job.typeOfEmployments,
        //   expire: this.job.expire,
        //   description: this.job.description,
        //   employee_quantity: this.job.employee_quantity,
        //   gender_id: this.job.genders
          
        // })
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
    console.log(this.id)
    this.jobService.update(this.id ,this.updateForm.value).subscribe({
      next: (res) => {
        console.log(res);
        // thong bao thanh cong
        this.toastr.success('Success', 'Update Successfully!');
        //reset formr(formData, this.id).subscribe(

        // Object.keys(this.updateForm.controls).forEach((key) => {
        //   this.updateForm.get(key)?.setValue('');
        //   this.updateForm.get(key)?.setErrors(null);
        // });
      },
      error: () => {
        this.toastr.error('Error', 'Update Fail! Try again');
      }
    });
  }

  get getControl() {
    return this.updateForm.controls;
  }

}
