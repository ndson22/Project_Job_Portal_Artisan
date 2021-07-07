import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {
  jobTypes !: any;
  employeePositions !: any;
  typeOfEmployments !: any;
  genders !: any;
  createForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getJobData();
    this.createForm = this.formBuilder.group({
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
    if (this.createForm.invalid) {
      return;
    }
    this.jobService.store(this.createForm.value).subscribe({
      next: (res) => {
        console.log(res);
        // thong bao thanh cong
        this.toastr.success('Success', 'Created Successfully!');
        //reset form
        Object.keys(this.createForm.controls).forEach((key) => {
          this.createForm.get(key)?.setValue('');
          this.createForm.get(key)?.setErrors(null);
        });
      },
      error: () => {
        this.toastr.error('Error', 'Created Fail! Try again');
      }
    });
  }

  get getControl() {
    return this.createForm.controls;
  }
}
