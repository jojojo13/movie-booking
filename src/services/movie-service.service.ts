import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  url = 'https://movie-booking-pro.herokuapp.com/api/';
  constructor(private $http: HttpClient) {}

  getAllMovies() {
    return this.$http.get(this.url+'movie');
  }
  getMovieBySearch(keyword: string, index: number, size: number) {
    return this.$http.get(
      this.url + `search?keyword=${keyword}&index=${index}&size=${size}`
    );
    
  }
}
