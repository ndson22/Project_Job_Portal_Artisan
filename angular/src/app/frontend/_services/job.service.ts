import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';

import { Job } from '../_models/job';

const baseUrl = `${environment.frontendUrl}/jobs`;

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Job[]> {
    return this.http.get<Job[]>(baseUrl);
  }

  get(id: number): Observable<Job> {
    return this.http.get<Job>(`${baseUrl}/${id}`);
  }

  store(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/store`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  getJobInfor(): Observable<any> {
    return this.http.get(`${baseUrl}/info`);
  }
}
