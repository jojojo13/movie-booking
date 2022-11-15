import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  constructor(private $http: HttpClient) {}

  getAllMovies() {
    return this.$http.get('http://localhost:8080/api/movie');
  }
}
