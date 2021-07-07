import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

const baseUrl = `${environment.frontendUrl}/companies`;

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(baseUrl);
  }

  changeVerify(id: number): Observable<Company> {
    return this.http.put<Company>(`${baseUrl}/${id}/verify`, null);
  }
}
