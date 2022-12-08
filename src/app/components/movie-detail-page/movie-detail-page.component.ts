import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieServiceService } from 'src/services/movie-service.service';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.css']
})
export class MovieDetailPageComponent implements OnInit {
  movie:any
  dangerRousURL:any
  constructor( private router:Router,private route: ActivatedRoute,private movieService:MovieServiceService,private sanitizer:DomSanitizer,private eRef: ElementRef) { }
  @HostListener('document:click', ['$event'])
  clickout(event:any) {
  //  console.log(event.target.tagName);
   if(event.target.tagName!='A'){
    document.querySelector('#iframe')?.classList.add('hide');
    (document?.querySelector('.overlay') as HTMLElement).style.display =
    'none';
   }
  }
  ngOnInit(): void {   
    this.movieService.getMovieByID(parseInt(
      this.route.snapshot.queryParamMap.get('movieID') as string
    )).subscribe((response)=>{
      this.movie=response
      this.dangerRousURL =
      this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.previewUrl);
      console.log(this.movie)
    })
  }
  showIframe(){

      document.querySelector('#iframe')?.classList.remove('hide');
      (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
  }
  bookingSeat(id:number,movie:any,time:any,date:any){
    this.router.navigate([`/booking-seat`],{ queryParams: { scheduleId: `${id}`} })
    this.movieService.selectedMovie=movie
    this.movieService.selectedSchedule=id
    this.movieService.selectedTime=time
    this.movieService.selectedDate=date
  }
}
