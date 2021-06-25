import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';

const baseUrl = `${environment.backendUrl}`;
const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/register`, data, headers);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data, headers);
  }
}
