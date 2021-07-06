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

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  getCurrentSeeker(): Observable<Seeker> {
    const user = this.userService.getUserFromLocalStorage();
    return this.http.get<Seeker>(`${baseUrl}/${user.seeker.id}`);
  }

  changeAvatar(data: FormData): Observable<Seeker> {
    return this.http.post<Seeker>(`${baseUrl}/${data.get('id')}/avatar`, data);
  }
}
