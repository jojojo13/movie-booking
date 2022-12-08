import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  url = 'http://localhost:8080/api/schedule';
  constructor(private http:HttpClient) { }

  getAllSchedule(){
    return this.http.get(this.url)
  }
}
