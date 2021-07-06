import { UserService } from './../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GenderService } from './../../../shared/services/gender.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Seeker } from './../../../shared/models/seeker';
import { SeekerService } from './../../../shared/services/seeker.service';
import { Component, OnInit } from '@angular/core';
import { Gender } from 'src/app/shared/models/gender';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment.prod';

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
  avatar: string = 'assets/frontend/images/candidates/01.jpg';
  seekerForm = this.formBuilder.group({
    name: ['', Validators.required],
    gender_id: [3, Validators.required],
    birthday: ['', Validators.required],
    email: ['', Validators.required],
    phone_number: ['', Validators.required],
    facebook: ['', Validators.required],
    address: ['', Validators.required],
  });

  constructor(
    private seekerService: SeekerService,
    private formBuilder: FormBuilder,
    private genderService: GenderService,
    private toastr: ToastrService,
    private userService: UserService,
  ) {
    this.seekerService.getCurrentSeeker().subscribe((res) => {
      this.seeker = res;
      this.avatar = `${environment.storageUrl}/${res.image}` ?? this.avatar;
      this.seekerForm.patchValue({
        name: res.name,
        gender_id: res.gender?.id ?? 3,
        birthday: res.birthday,
        email: res.email,
        phone_number: res.phone_number,
        facebook: res.facebook,
        address: res.address,
      });
    });
    this.genderService.getAll().subscribe((res) => {
      this.genders = res;
    });
  }

  ngOnInit(): void {}

  onSubmitSeeker() {}

  // Upload avatar
  changeAvatar(event: any) {
    const user = this.userService.getUserFromLocalStorage();

    const data = new FormData();
    data.append('image', event.target.files[0]);
    data.append('id', user.seeker.id);
    this.seekerService.changeAvatar(data).subscribe((res: Seeker) => {
      this.toastr.success('Change avatar successfully!');
      this.avatar = `${environment.storageUrl}/${res.image}`;
    });
  }
}
