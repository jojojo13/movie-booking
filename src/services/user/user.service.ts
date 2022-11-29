import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8080/api/user';
  constructor(private $http: HttpClient) { }
  getUserByID(id:number){
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.$http.get(
      this.url + `/user-account?id=${id}`,httpOptions1
    );
  }
}
