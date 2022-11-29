import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  url = 'http://localhost:8080/api/movie';
  constructor(private $http: HttpClient) {}

  getAllMovies() {
    return this.$http.get(this.url);
  }
  getMovieBySearch(keyword: string, index: number, size: number) {
    return this.$http.get(
      this.url + `/search?keyword=${keyword}&index=${index}&size=${size}`
    );
  }
 
}
