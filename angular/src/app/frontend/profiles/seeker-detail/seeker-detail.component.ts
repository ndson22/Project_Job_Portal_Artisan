import { SeekerExperienceService } from './../../../shared/services/seeker-experience.service';
import { UserService } from './../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GenderService } from './../../../shared/services/gender.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Seeker } from './../../../shared/models/seeker';
import { SeekerService } from './../../../shared/services/seeker.service';
import { Component, OnInit } from '@angular/core';
import { Gender } from 'src/app/shared/models/gender';
import { environment } from 'src/environments/environment.prod';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-seeker-detail',
  templateUrl: './seeker-detail.component.html',
  styleUrls: ['./seeker-detail.component.css'],
})
export class SeekerDetailComponent implements OnInit {
  isLoading = false;
  dateFormat = 'dd/MM/yyyy';
  seeker!: Seeker;
  genders!: Gender[];
  avatar: string = '';

  seekerForm = this.formBuilder.group({
    name: ['', Validators.required],
    gender_id: [3, Validators.required],
    birthday: ['', Validators.required],
    email: ['', Validators.required],
    phone_number: [
      '',
      [Validators.required, Validators.pattern('^0?[0-9]{9}$')],
    ],
    facebook: ['', Validators.required],
    address: ['', Validators.required],
  });

  seekerExperienceForm = this.formBuilder.group({
    description: ['', [Validators.required, Validators.maxLength(5000)]],
  });

  constructor(
    private seekerService: SeekerService,
    private formBuilder: FormBuilder,
    private genderService: GenderService,
    private toastr: ToastrService,
    private userService: UserService,
    private seekerExperienceService: SeekerExperienceService
  ) {
    this.seekerService.getCurrentSeeker().subscribe((res) => {
      this.seeker = res;
      this.avatar = `${environment.storageUrl}/${res.image}` ?? this.avatar;
      this.seekerForm.patchValue({
        name: res.name,
        gender_id: res.gender?.id ?? 3,
        birthday: res.birthday,
        email: res.email,
        phone_number: '0' + res.phone_number ?? '',
        facebook: res.facebook,
        address: res.address,
      });
      if (res.seeker_experience) {
        this.seekerExperienceForm.patchValue({
          description: res.seeker_experience.description,
        });
      }
    });

    // Get all gender value
    this.genderService.getAll().subscribe((res) => {
      this.genders = res;
    });
  }

  ngOnInit(): void {}

  // Upload avatar
  changeAvatar(event: any) {
    const data = new FormData();
    data.append('image', event.target.files[0]);
    this.seekerService.changeAvatar(data).subscribe((res: Seeker) => {
      this.toastr.success('Change avatar successfully!');
      this.avatar = `${environment.storageUrl}/${res.image}`;
    });
  }

  // Update seeker information
  onSubmitSeeker() {
    this.isLoading = true;
    this.seekerForm.controls['birthday'].setValue(
      formatDate(this.seekerForm.controls['birthday'].value, 'yyyy-MM-dd', 'en')
    );
    this.seekerService.updateSeeker(this.seekerForm.value).subscribe(
      (res) => {
        this.toastr.success('Update information successfully');
        this.seekerForm.markAsPristine();
      },
      (err) => {
        this.toastr.error('Update information fail');
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  // Update seeker experiences
  onSubmitSeekerExperience() {
    if (!this.seeker.seeker_experience) {
      this.seekerExperienceForm.addControl('seeker_id', this.formBuilder.control(this.seeker.id, Validators.required));
      this.seekerExperienceService
        .createSeekerExperience(this.seekerExperienceForm.value)
        .subscribe(
          (res) => {
            this.seeker = res;
            this.isLoading = true;
            this.toastr.success('Update experience successfully');
            this.seekerExperienceForm.markAsPristine();
          },
          (err) => {
            this.toastr.error('Update experience fail');
          }
        );
    } else {
      this.seekerExperienceService
        .updateSeekerExperience(this.seekerExperienceForm.value, this.seeker.seeker_experience.id)
        .subscribe(
          (res) => {
            this.seeker = res;
            this.isLoading = true;
            this.toastr.success('Update experience successfully');
            this.seekerExperienceForm.markAsPristine();
          },
          (err) => {
            this.toastr.error('Update experience failsss');
          },
          () => {
            this.isLoading = false;
          }
        );
    }
  }
}
