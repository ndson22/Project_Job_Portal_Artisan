import { Seeker } from './../models/seeker';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeekerExperience } from '../models/seeker-experience';
import { environment } from 'src/environments/environment.prod';

const baseUrl = `${environment.frontendUrl}/experiences`;

@Injectable({
  providedIn: 'root'
})
export class SeekerExperienceService {
  user = this.userService.getUserFromLocalStorage();

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  // getCurrentSeekerExperience(): Observable<SeekerExperience> {
  //   return this.http.get<SeekerExperience>(`${baseUrl}/${this.user.seeker.seeker_experience.id}`);
  // }

  updateSeekerExperience(data: any, id: number): Observable<Seeker> {
    return this.http.put<Seeker>(`${baseUrl}/${id}`, data);
  }

  createSeekerExperience(data: any): Observable<Seeker> {
    return this.http.post<Seeker>(`${baseUrl}`, data);
  }
}
