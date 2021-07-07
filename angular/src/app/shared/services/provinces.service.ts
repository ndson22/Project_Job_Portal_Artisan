import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Province } from '../models/province';
import { first } from 'rxjs/operators';

const baseUrl = `${environment.frontendUrl}/provinces`;

@Injectable({
  providedIn: 'root',
})
export class ProvincesService {
  provinces = new Subject<Province[]>();

  constructor(private http: HttpClient) {
    this.getAll()
      .pipe(first())
      .subscribe((res) => {
        this.provinces.next(res);
      });
  }

  getAll(): Observable<Province[]> {
    return this.http.get<Province[]>(baseUrl);
  }
}
