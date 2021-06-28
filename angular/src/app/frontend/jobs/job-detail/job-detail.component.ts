import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  jobPost!: Job;
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
        this.jobPost = res;
      },
      error: (res) => {
        this.router.navigate(['error']);
      }
    });
  }
}
