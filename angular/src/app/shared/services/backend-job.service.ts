import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { Job } from '../models/job';
import { jobTypes } from '../models/jobType';
import { JobProvinces } from '../models/jobProvince';

const backendBaseUrl = `${environment.backendUrl}/jobs`;

@Injectable({
  providedIn: 'root'
})
export class BackendJobService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Job[]> {
    return this.http.get<Job[]>(`${backendBaseUrl}`);
  }

  changeStatus(id: number): Observable<Job> {
    return this.http.put<Job>(`${backendBaseUrl}/${id}/active`, null);
  }

  changePromote(id: number): Observable<Job> {
    return this.http.put<Job>(`${backendBaseUrl}/${id}/promote`, null);
  }
}
