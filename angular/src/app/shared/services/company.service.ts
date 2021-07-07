import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { Job } from '../models/job';

const baseUrl = `${environment.frontendUrl}/companies`;

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(baseUrl);
  }

  getCompanyTop(): Observable<Job[]> {
    return this.http.get<Job[]>(`${baseUrl}/top`);
  }

  changeVerify(company: Company): Observable<Company> {
    return this.http.put<Company>(`${baseUrl}/${company.id}/verify`, null);
  }

  changeLock(company: Company): Observable<Company> {
    return this.http.put<Company>(`${baseUrl}/${company.id}/lock`, null);
  }

  changeSponsor(company: Company): Observable<Company> {
    return this.http.put<Company>(`${baseUrl}/${company.id}/sponsor`, null);
  }

  update(data: any): Observable<Company> {
    return this.http.put<Company>(`${baseUrl}/${data.id}`, data);
  }

  updateImage(data: any, company: Company): Observable<Company> {
    return this.http.post<Company>(`${baseUrl}/${company.id}/image`, data);
  }
}
