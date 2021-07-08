import { UserService } from './../../../shared/services/user.service';
import { Company } from './../../../shared/models/company';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job';
import { JobService } from 'src/app/shared/services/job.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/shared/models/contact';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent implements OnInit {
  jobPost!: Job;
  jobTake!: any;
  jobs: Job[] = [];
  company!: Company;
  id!: number;
  contact!: Contact;

  createForm = this.formBuilder.group({
    name: [''],
    email: [''],
    phone: [''],
    message: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private toastr: ToastrService,
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getJobPost();
  }

  getJobPost() {
    this.jobService.get(this.route.snapshot.params['id']).subscribe({
      next: (res: any) => {
        this.jobPost = res.jobPost;
        this.jobTake = res.jobs;
        this.company = res.company;
      },
      error: (res) => {
        this.router.navigate(['error']);
      },
    });
  }

  toContact() {
    document.getElementById('apply_scroll')?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  onAddContact() {
    this.createForm.addControl(
      'company_id',
      this.formBuilder.control(this.company.id)
    );
    this.contactService.contactStore(this.createForm.value).subscribe({
      next: (res) => {
        this.toastr.success('Success', 'Created Successfully!');
        this.createForm.reset();
      },
      error: () => {
        this.toastr.error('Error', 'Created Fail! Try again');
      },
    });
  }

  confirm() {
    this.contactService.seekerContactStore(this.company.id).subscribe(
      (res) => {
        this.toastr.success('Send Cv successfully');
      },
      (err) => {
        this.toastr.error('You have applied to this job');
      }
    );
  }
}
