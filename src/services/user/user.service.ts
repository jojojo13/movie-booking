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

  updateUserProfile(user:any){
     let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.$http.put(
      this.url + `/update`,user,httpOptions1
    );
  }

  addUserAsEmployee(employee:any){
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.$http.post(
      this.url + `/add-employee`,employee,httpOptions1
    );
  }
  getAllUserAsEmployee(index:number,size:number){
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.$http.get(
      this.url + `/user-as-employee?index=${index}&size=${size}`,httpOptions1
    );
  }
}
