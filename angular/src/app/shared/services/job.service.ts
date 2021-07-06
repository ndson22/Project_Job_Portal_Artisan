import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { Job } from '../models/job';
import { jobTypes } from '../models/jobType';
import { JobProvinces } from '../models/jobProvince';

const baseUrl = `${environment.frontendUrl}/jobs`;
const baseDashboardUrl = `${environment.frontendUrl}/dashboard`;
@Injectable({
  providedIn: 'root',
})
export class JobService {
  jobPosts!: Job[];
  searching!: string;
  jobTypeId!: number;
  provinceId!: number;
  flag: boolean = false;
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
    return this.http.put(`${baseUrl}/edit/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }

  getJobInfor(): Observable<any> {
    return this.http.get(`${baseUrl}/info`);
  }

  search(data: any): Observable<any> {
    this.flag = true;
    return this.http.post<Job[]>(`${baseUrl}/search`, data);
  }

  getJobType(): Observable<jobTypes> {
    return this.http.get<jobTypes>(`${baseUrl}/types`);
  }

  getJobProvince(): Observable<JobProvinces> {
    return this.http.get<JobProvinces>(`${baseUrl}/provinces`);
  }

  getJobByCompany(page: number, size = 20): Observable<any> {
    return this.http.get<any>(`${baseDashboardUrl}/jobs/${page}/${size}`);
  }

  changeActive(id: number): Observable<any> {
    return this.http.put<any>(`${baseDashboardUrl}/jobs/active`, {id: id});
  }
}
