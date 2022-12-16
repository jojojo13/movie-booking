import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  url = 'https://hehe.up.railway.app/api/cinemaroom';
  selectedCinemaRoom:any
  constructor(private http:HttpClient) { }

  getAllCinema(index:number,size:number){
    return this.http.get(this.url+`?index=${index}&size=${size}`)
  }

  getSeatByCinemaID(cinemaID:number){
    return this.http.get(this.url+`/seat?cinemaID=${cinemaID}`)
  }
  
  updateSeat(listSeat:any){
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.put(this.url+`/updateSeat`,listSeat,httpOptions1)
  }
}
