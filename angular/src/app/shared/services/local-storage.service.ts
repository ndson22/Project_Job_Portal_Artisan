import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageSub = new Subject<String>();

  constructor() {}

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next('setted');
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    this.storageSub.next('removed');
  }
}
