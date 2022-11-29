import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8080/api/auth';
  public token=localStorage.getItem('token')
  public user: any
  public userSubject: BehaviorSubject<boolean>;
  public headerSubject: BehaviorSubject<boolean>;
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<boolean>(false);
   this.headerSubject=new BehaviorSubject<boolean>(false);
 
  }

  login(user: any) {
    return this.http.post(this.url + '/signin', user);
  }
  register(user: any) {
    return this.http.post(this.url + '/signup', user);
  }
  getUserInfo() {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get(this.url + '/userInfo', httpOptions1);
  }
}
