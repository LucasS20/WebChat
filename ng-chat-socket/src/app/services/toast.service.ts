import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private visibilitySource = new BehaviorSubject<boolean>(false);
  visibility$ = this.visibilitySource.asObservable();

  constructor() {}

  show() {
    this.visibilitySource.next(true);
  }

  hide() {
    this.visibilitySource.next(false);
  }
}
