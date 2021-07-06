import { BackendJobService } from './../../../shared/services/backend-job.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs!: Job[];

  constructor(
    private backendJobService: BackendJobService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.backendJobService.getAll().subscribe((jobs: Job[]) => {
      this.jobs = jobs;
    });
  }

  onActive(job: Job): void {
    this.backendJobService
      .changeStatus(job.id)
      .subscribe(
        (res: Job) => {
          job.is_active = res.is_active;
          this.toastr.success('Change status sucessfully!');
        },
        (err) => {
          this.toastr.error('Change status error!');
        }
      );
  }

  onPromote(job: Job): void {
    this.backendJobService
      .changePromote(job.id)
      .subscribe(
        (res: Job) => {
          job.is_promote = res.is_promote;
          this.toastr.success('Change status sucessfully!');
        },
        (err) => {
          this.toastr.error('Change status error!');
        }
      );
  }
}
