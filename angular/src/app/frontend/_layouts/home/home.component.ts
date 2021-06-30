import { Job } from './../../../shared/models/job';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from './../../../shared/services/job.service';
import { Component, OnInit } from '@angular/core';
import { jobTypes } from 'src/app/shared/models/jobType';
import { JobProvinces } from 'src/app/shared/models/jobProvince';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  jobTypes! : jobTypes[]  ;
  jobProvinces! : JobProvinces[];

  constructor(
    private jobService: JobService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: [''],
      job_type_id: [''],
      province_id: [''],
    });
    this.getJobTypes();
    this.getJobProvince();
  }

  search() {
    this.jobService.search(this.searchForm.value).subscribe(
      (res) => {
        console.log(res)
      },
       () => {
      }
    );
  }

  getJobTypes() {
   this.jobService.getJobType().subscribe({
      next: (res: any) => {
        this.jobTypes = res;
      }
    })
   };

   getJobProvince(){
    this.jobService.getJobProvince().subscribe({
      next: (res: any) => {
        this.jobProvinces = res;
      }
    })
   };





}
