import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  constructor(private http: HttpClient) {}
  url = 'https://hehe.up.railway.app/api/seats';
  urlBooking = 'https://hehe.up.railway.app/api/booking';
  getSeatByScheduleId(scheduleId: number) {
    return this.http.get(this.url + `?scheduleMovieId=${scheduleId}`);
  }

  getEmptySeat(scheduleId: number) {
    return this.http.get(this.url + `/empty?scheduleMovieId=${scheduleId}`);
  }
  bookingSeat(listSeat: any, scheduleID: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      this.urlBooking + `/add?scheduleMovieId=${scheduleID}`,
      listSeat,
      httpOptions1
    );
  }
}
