import { Anonymous } from './../models/anonymous';
import { UserService } from './user.service';
import { Contact } from 'src/app/shared/models/contact';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seeker } from '../models/seeker';

const baseUrl = `${environment.frontendUrl}/company-contacts`;

@Injectable({
  providedIn: 'root'
})
export class CompanyCvService {

  user = this.userService.getUserFromLocalStorage();

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${baseUrl}/contacts/${this.user.company.id}`);
  }

  getSeekerContact(seekerId: number): Observable<Seeker> {
    return this.http.get<Seeker>(`${baseUrl}/contacts/seekers/${seekerId}`);
  }

  getAnonymousContact(anonymousId: number): Observable<Anonymous> {
    return this.http.get<Anonymous>(`${baseUrl}/contacts/anonymous/${anonymousId}`);
  }
}
