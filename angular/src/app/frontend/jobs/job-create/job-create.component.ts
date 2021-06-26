import { JobService } from './../../_services/job.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
  provinces !: any;
  createForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.getJobData();
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      job_type_id: ['Job Type', [Validators.required]],
      from_salary: ['', [Validators.required]],
      to_salary: ['', [Validators.required]],
      employee_position_id: ['Job position', [Validators.required]],
      experience: ['', [Validators.required]],
      type_of_employment_id: ['Type of Employment', [Validators.required]],
      expire: ['', [Validators.required]],
      description: ['', [Validators.required]],
      employee_quantity: ['', [Validators.required]],
      gender_id: ['Gender'],
      province_id: ['Province', [Validators.required]],
    });
  }

  getJobData() {
    this.jobService.getJobInfor().subscribe({
      next: (res) => {
        this.jobTypes = res.jobTypes;
        this.employeePositions = res.employeePositions;
        this.typeOfEmployments = res.typeOfEmployments;
        this.genders = res.genders;
        this.provinces = res.provinces
      },
      error: (res) => {
        console.log(res);
      }
    });
  }

  onSubmit() {

  }

  get getControl(){
    return this.createForm.controls;
  }
}
