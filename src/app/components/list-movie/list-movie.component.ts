import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from 'src/services/movie-service.service';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css'],
})
export class ListMovieComponent implements OnInit {
  listMovie: any;
  isLoaded = false;
  itemsPerPage = 2;
  totalItems!: number;
  page: number = 1;
  constructor(private movieService: MovieServiceService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.isLoaded=false
    this.movieService.getAllMovies(this.page - 1, this.itemsPerPage).subscribe(
      (response: any) => {
        this.listMovie = response.movie;
        this.isLoaded = true;
        this.totalItems = response.totalItem;
  
      },
      (err) => {
        this.isLoaded = true;
      }
    );
  }
  gty(event:any){
    this.loadData();
  }
}
