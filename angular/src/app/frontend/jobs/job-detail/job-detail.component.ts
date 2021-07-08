import { UserService } from './../../../shared/services/user.service';
import { Company } from './../../../shared/models/company';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job';
import { JobService } from 'src/app/shared/services/job.service';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/shared/models/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/shared/services/contact.service';
import { EmailService } from 'src/app/shared/services/email.service';

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
    name: ['', [Validators.required]],
    email: [
      '',
      [Validators.required, Validators.email],
    ],
    phone_number: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  forwardToEmailForm!: FormGroup;
  forwardToEmailFromStatus = {
    visible: false,
    loading: false,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private toastr: ToastrService,
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    public userService: UserService
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

  showForwardToEmailModal(): void {
    if (!this.forwardToEmailFromStatus.loading) {
      this.forwardToEmailForm = this.formBuilder.group({
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(255)],
        ],
        job_post_id: [this.jobPost.id, [Validators.required]],
      });
    }
    this.forwardToEmailFromStatus.visible = true;
  }

  resetForwardToEmailModal(): void {
    this.forwardToEmailFromStatus.visible = false;
    this.forwardToEmailForm.reset();
  }

  handleOkForwardToEmailModal(): void {
    this.forwardToEmailFromStatus.loading = true;
    const data = this.forwardToEmailForm.value;
    console.log(data);
    this.emailService.forwardJobDetail(data).subscribe(
      (res) => {
        this.resetForwardToEmailModal();
        this.toastr.success('Sending successfully!');
      },
      (err) => {
        this.toastr.error('Sending unsuccessfully, please try again!');
      },
      () => {
        this.forwardToEmailFromStatus.loading = false;
      }
    );
  }

  handleCancleForwardToEmailModal(): void {
    if (!this.forwardToEmailFromStatus.loading) {
      this.resetForwardToEmailModal();
    }
  }
}
