import { environment } from './../../../../environments/environment.prod';
import { Anonymous } from './../../../shared/models/anonymous';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/shared/models/contact';
import { CompanyCvService } from './../../../shared/services/company-cv.service';
import { Component, OnInit } from '@angular/core';
import { Seeker } from 'src/app/shared/models/seeker';

@Component({
  selector: 'app-company-cv',
  templateUrl: './company-cv.component.html',
  styleUrls: ['./company-cv.component.css'],
})
export class CompanyCvComponent implements OnInit {
  storageUrl = environment.storageUrl;
  isVisibleSeekerModal = false;
  isVisibleAnonymousModal = false;
  contact!: Contact[];
  seeker!: Seeker;
  anonymous!: Anonymous;

  constructor(
    private companyCvService: CompanyCvService,
    private toastr: ToastrService
  ) {
    this.companyCvService.getContacts().subscribe(
      (res) => {
        this.contact = res;
      },
      (err) => {
        this.toastr.error('Loading information fail');
      }
    );
  }

  ngOnInit(): void {}

  showSeekerModal(seekerId: number): void {
    this.companyCvService.getSeekerContact(seekerId).subscribe(
      (res) => {
        this.seeker = res;
        this.isVisibleSeekerModal = true;
      },
      (err) => {
        this.toastr.error('Loading profile fail');
      }
    );
  }

  showAnonymousModal(anonymousId: number): void {
    this.companyCvService.getAnonymousContact(anonymousId).subscribe(
      (res) => {
        this.anonymous = res;
        this.isVisibleAnonymousModal = true;
      },
      (err) => {
        this.toastr.error('Loading data fail');
      }
    );
  }

  handleSeekerModalOk(): void {
    this.isVisibleSeekerModal = false;
  }

  handleAnonymousModalOk(): void {
    this.isVisibleAnonymousModal = false;
  }
}
