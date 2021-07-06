import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../models/province';

const baseUrl = `${environment.frontendUrl}/provinces`;

@Injectable({
  providedIn: 'root',
})
export class ProvincesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Province[]> {
    return this.http.get<Province[]>(baseUrl);
  }
}
