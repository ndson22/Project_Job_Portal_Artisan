import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrlContact = `${environment.frontendUrl}/contact`;
const seekerUrlContact = `${environment.frontendUrl}/company-contacts/contacts`;
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  user = this.userService.getUserFromLocalStorage();
  constructor(private http: HttpClient, private userService: UserService) {}
  contactStore(data: any): Observable<any> {
    return this.http.post(`${baseUrlContact}/store`, data);
  }

  seekerContactStore(companyId: number): Observable<any> {
    const a = this.userService.getUserFromLocalStorage();
    return this.http.post(
      `${seekerUrlContact}/${companyId}/store/${a.seeker.id}`,
      null
    );
  }
}
