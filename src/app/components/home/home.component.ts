import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieServiceService } from 'src/services/movie-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listMovie: any;
  isLoaded=false;
  constructor(private movieService: MovieServiceService,private router:Router) {}

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 1000,
  };

  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    // .style.backgroundImage="url('img_tree.png')";
    console.log( document.querySelector('.slide .slick-slide .slick-current .slick-active'))
    
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }
  ngOnInit(): void {
    this.movieService.getAllMovies(0,999999999).subscribe((response:any) => {
      this.listMovie = response.movie;
      this.isLoaded=true
      console.log(this.listMovie)
    
    });
  }
  navigateTo(movieID:number){
    this.router.navigate([`/movie-detail`],{ queryParams: { movieID: `${movieID}`} })
  }
}
