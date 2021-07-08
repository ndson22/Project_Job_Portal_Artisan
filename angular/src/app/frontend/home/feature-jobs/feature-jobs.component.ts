import { Job } from './../../../shared/models/job';
import { JobService } from './../../../shared/services/job.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-feature-jobs',
  templateUrl: './feature-jobs.component.html',
  styleUrls: ['./feature-jobs.component.css']
})
export class FeatureJobsComponent implements OnInit {
  jobPosts!: Job[];
  storageUrl = environment.storageUrl;
  constructor(
    private jobService: JobService,
  ) { }

  ngOnInit(): void {
    this.getJobPosts();
  }

  getJobPosts() {
    this.jobService.getAll().subscribe(
      (res) => {
        this.jobPosts = res;
      },
    );
  }
}
