import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../models/gender';
import { environment } from 'src/environments/environment.prod';

const baseUrl = `${environment.frontendUrl}/genders`;

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${baseUrl}`);
  }
}
