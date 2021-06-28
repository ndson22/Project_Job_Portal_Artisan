import { Job } from './../../_models/job';
import { JobService } from './../../_services/job.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  jobPost !: Job;
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
      next: (res) => {
        console.log(res);
        this.jobPost = res;
      },
      error: (res) => {
        this.router.navigate(['error']);
      }
    });
  }
}
