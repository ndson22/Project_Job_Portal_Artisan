import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Province } from '../models/province';
import { environment } from 'src/environments/environment.prod';

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
