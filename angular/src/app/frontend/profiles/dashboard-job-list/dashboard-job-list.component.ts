import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/shared/services/job.service';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/models/job';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-job-list',
  templateUrl: './dashboard-job-list.component.html',
  styleUrls: ['./dashboard-job-list.component.css']
})
export class DashboardJobListComponent implements OnInit {
  listOfData!: any;
  isVisible = false;
  isConfirmLoading = false;
  pageIndex = 1;
  pageSize = 20;

  // Edit Job Post
  title!: string;
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
  job!: Job
  constructor(
    private jobService: JobService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private routeActive: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  changePageIndex(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.getData();
  }

  getData() {
    this.jobService.getJobByCompany(this.pageIndex, this.pageSize).subscribe(
      (res) => {
        this.listOfData = res.jobPosts;
      },
      (error) => {
        this.toastr.error('Load fail');
      }
    );
  }

  // Delete Job Post
  confirm(id: number) {
    this.jobService.delete(id).subscribe(
      (res) => {
        this.listOfData = res;
        this.toastr.success('Delete Succesfully!');
      },
      (res) => {
        this.toastr.error('Delete Fail. Try again!');
      }
    );
  }

  // Change job post active
  changeActive(id: number) {
    this.jobService.changeActive(id).subscribe(
      (res) => {
        this.listOfData = res;
        this.toastr.success('Changed Succesfully!');
      },
      (res) => {
        this.toastr.error('Delete Fail. Try again!');
      }
    );
  }

  // Edit job post modal
  showModal(id: number): void {
    this.getJobData();
    this.getJobDetail(id);
    this.isVisible = true;
  }

  // Submit update job post
  handleOk(): void {
    console.log(1);
    this.isConfirmLoading = true;
    this.jobService.update(this.id, this.updateForm.value).subscribe({
      next: (res) => {
        this.listOfData = res;
        this.isVisible = false;
        this.isConfirmLoading = false;
        // thong bao thanh cong
        this.toastr.success('Success', 'Update Successfully!');
      },
      error: () => {
        this.toastr.error('Error', 'Update Fail! Try again');
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // Get job post information
  getJobDetail(id: number) {
    this.id = id;
    this.jobService.get(this.id).subscribe(
      (res: any) => {
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

  // Get select option value
  getJobData() {
    this.jobService.getJobInfor().subscribe(
      (res) => {
        this.jobTypes = res.jobTypes;
        this.employeePositions = res.employeePositions;
        this.typeOfEmployments = res.typeOfEmployments;
        this.genders = res.genders;
      },
      (res) => {
        console.log(res);
      }
    );
  }

  get getControl() {
    return this.updateForm.controls;
  }
}
