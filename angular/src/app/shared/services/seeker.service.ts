import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Seeker } from '../models/seeker';

const baseUrl = `${environment.frontendUrl}/seekers`;
@Injectable({
  providedIn: 'root'
})
export class SeekerService {
  user = this.userService.getUserFromLocalStorage();

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  getCurrentSeeker(): Observable<Seeker> {
    return this.http.get<Seeker>(`${baseUrl}/${this.user.seeker.id}`);
  }

  changeAvatar(data: FormData): Observable<Seeker> {
    return this.http.post<Seeker>(`${baseUrl}/${this.user.seeker.id}/avatar`, data);
  }

  updateSeeker(data: any): Observable<Seeker> {
    return this.http.put<Seeker>(`${baseUrl}/${this.user.seeker.id}`, data);
  }
}
