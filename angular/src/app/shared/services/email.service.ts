import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const backendUrl = `${environment.backendUrl}/emails`;
const baseUrl = `${environment.backendUrl}/emails`;

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  forwardJobDetail(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/forward-job-detail`, data);
  }
}
