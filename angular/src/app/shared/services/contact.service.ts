import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";


const baseUrlContact = `${environment.frontendUrl}/contact`;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  contactStore(data: any): Observable<any> {
    return this.http.post(`${baseUrlContact}/store`, data);
  }
}
