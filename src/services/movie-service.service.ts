import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  url = 'http://localhost:8080/api/movie';
  selectedMovie:any
  selectedDate:any
  selectedSchedule:any
  selectedSeat:any
  totalPrice:number=0
  selectedTime:any
  constructor(private $http: HttpClient) {}

  getAllMovies(index: number, size: number) {
    return this.$http.get(this.url + `?index=${index}&size=${size}`);
  }
  getMovieBySearch(keyword: string, index: number, size: number) {
    return this.$http.get(
      this.url + `/search?keyword=${keyword}&index=${index}&size=${size}`
    );
  }

  addMovie(movie: any, cinemaID: number) {
    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.$http.post(
      this.url + `/addMovie?cinemaId=${cinemaID}`,
      movie,
      httpOptions1
    );
  }

  getMovieByID(movieID: number) {
    return this.$http.get(this.url + `/detail?movieID=${movieID}`);
  }
  getMovieByDate(date: string) {
    return this.$http.get(
      `http://localhost:8080/api/scheduleMovie?date=${date}`
    );
  }
}
