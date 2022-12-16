import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  url = 'https://hehe.up.railway.app/api/type';
  constructor(private http:HttpClient) { }

  getAllType(){
    return this.http.get(this.url)
  }
}
