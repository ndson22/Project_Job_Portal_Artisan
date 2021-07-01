import { Component, OnInit, OnDestroy } from '@angular/core';
import  { Job } from "../../../shared/models/job";
import  { JobService } from "../../../shared/services/job.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService)
  { }
  subscription!: Subscription;
  jobs!: Job[];


  ngOnInit(): void {
    this.getAllPost()
  }

  getAllPost() {
   this.subscription =  this.jobService.getAll().subscribe({
      next: (res) => {
        this.jobs = res;
      },
      error: (res) => {
        this.router.navigate(['error']);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
