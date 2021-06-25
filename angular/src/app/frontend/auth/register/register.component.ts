import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  candidateForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password_confirmation: ['', Validators.required],
    agree: ['', [Validators.requiredTrue]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitCandidate() {
    this.authService
      .register(this.candidateForm.value)
      .pipe(first())
      .subscribe(
        (response: any) => {
          this.router.navigate(['/login']);
          this.toastr.success(
            'Please confirm your email',
            'Register Successfully'
          );
        },
        (error: any) => {
          this.toastr.error(error.message, 'Failed To Register');
        }
      );
  }
}
