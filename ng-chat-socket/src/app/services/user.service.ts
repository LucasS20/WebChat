import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SpinnerService} from "./spinnerService/spinner.service";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url: string = 'http://ec2-52-90-189-121.compute-1.amazonaws.com:8080';
  readonly userPath: string = '/api/user/';

  constructor(public http: HttpClient, public spinner: SpinnerService) {
  }

  criarProfessor(formData: any): Observable<any> {
    return this.http.post(`${this.url}${this.userPath}create`, formData)
  }

  login(formData: any):Observable<any> {
    return this.http.post(`${this.url}${this.userPath}login`, formData)
  }
}
