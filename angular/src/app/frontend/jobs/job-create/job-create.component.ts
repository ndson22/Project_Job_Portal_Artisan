import { JobService } from './../../_services/job.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {
  jobTypes !: string[];
  employeePositions !: string[];
  typeOfEmployments !: string[];
  genders !: string[];
  createForm = this.formBuilder.group({
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
    gender_id: [''],
  });
  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.getJobData();
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
}
