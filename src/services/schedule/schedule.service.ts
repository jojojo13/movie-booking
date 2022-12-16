import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  url = 'https://hehe.up.railway.app/api/schedule';
  constructor(private http:HttpClient) { }

  getAllSchedule(){
    return this.http.get(this.url)
  }
}
