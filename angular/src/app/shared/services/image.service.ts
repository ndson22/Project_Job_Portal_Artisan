import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Company } from '../models/company';
import { User } from '../models/user';

const storageUrl = environment.storageUrl;

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  checkNullAvatar(user: User) {
    return user.image
      ? storageUrl + user.image
      : 'assets/frontend/images/candidates/01.jpg';
  }

  checkNullCompanyAvatar(company: Company) {
    return company.image
      ? storageUrl + company.image
      : 'assets/frontend/images/candidates/01.jpg';
  }
}
