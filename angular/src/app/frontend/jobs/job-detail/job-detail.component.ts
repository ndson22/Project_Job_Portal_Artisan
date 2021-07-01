import { Company } from './../../../shared/models/company';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job';
import { JobService } from 'src/app/shared/services/job.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  jobPost!: Job;
  jobTake! : any;
  jobs : Job[] = [];
  company !: Company;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.getJobPost();
  }

  getJobPost() {
    this.jobService.get(this.route.snapshot.params['id']).subscribe({
      next: (res : any) => {
        this.jobPost = res.jobPost;
        this.jobTake = res.jobs;
        this.company = res.company;
      },
      error: (res) => {
        this.router.navigate(['error']);
      }
    });
  }
}
