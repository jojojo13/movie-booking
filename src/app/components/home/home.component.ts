import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from 'src/services/movie-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listMovie:any
  constructor(private movieService:MovieServiceService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((movies)=>{
      this.listMovie=movies
    })
  }

}
