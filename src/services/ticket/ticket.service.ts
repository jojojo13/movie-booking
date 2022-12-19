import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  url = 'https://hehe.up.railway.app/api/ticket';
  ticketSelected:any
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
  updateConfirmTicket(ticketID:number){
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.put(
      this.url + `?ticketID=${ticketID}`,httpOptions1
    );
  }
}
