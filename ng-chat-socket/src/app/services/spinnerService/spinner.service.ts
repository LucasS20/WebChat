import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loading = new BehaviorSubject<boolean>(false);
  constructor() { }


  get isLoading() {
    return this.loading.asObservable();
  }

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}