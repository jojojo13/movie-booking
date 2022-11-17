import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from 'src/services/movie-service.service';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css']
})
export class ListMovieComponent implements OnInit {
  listMovie:any
  constructor(private movieService:MovieServiceService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((response)=>{
      this.listMovie=response
    })
  }

}
