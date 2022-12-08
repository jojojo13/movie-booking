import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  url = 'http://localhost:8080/api/ticket';
  constructor(private http:HttpClient) { }

  getAllTicket(){
    return this.http.get(this.url)
  }
  getBookingHistory(){
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get(
      this.url + `/bookedTicket`,httpOptions1
    );
  }
}
