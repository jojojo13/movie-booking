import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  url = 'http://localhost:8080/api/type';
  constructor(private http:HttpClient) { }

  getAllType(){
    return this.http.get(this.url)
  }
}
