import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from 'src/services/movie-service.service';

@Component({
  selector: 'app-show-times',
  templateUrl: './show-times.component.html',
  styleUrls: ['./show-times.component.css'],
})
export class ShowTimesComponent implements OnInit {
  weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
  showTimeDays: any;
  listMovie:any
  clickedTime=0;
  msg=''
  constructor(private movieService:MovieServiceService,private router:Router) {
    this.showTimeDays = [];
  }

  ngOnInit(): void {
   
    this.get5daysNextFromToday();
    this.loadMovieByDate(new Date())
  }
  get5daysNextFromToday() {
    let today = new Date();
    for (let i = 0; i < 5; i++) {
      let nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      this.showTimeDays.push(nextDay);
    }
  }
  getMovieByShowTime(showTime: any,index:number) {
    this.clickedTime=index
    this.loadMovieByDate(showTime)
    
  }
  loadMovieByDate(date:Date){
    let dateSelected=date.toISOString().split('T')[0]
    this.movieService.selectedDate=dateSelected
    this.movieService.getMovieByDate(dateSelected).subscribe((response:any)=>{
     
      response.forEach((ele:any) => {
        
        this.movieService.getMovieByID(ele.scheduleTimeDTO[0].movieId).subscribe((data:any)=>{
          ele.actor=data.actor
          ele.movie_name_vn=data.movie_name_vn;
          ele.movie_name_english=data.movie_name_english
          ele.small_image=data.small_image
          ele.previewUrl=data.previewUrl
  
        })
     
      });
      this.listMovie=response
      this.msg=''
 
     
    },err=>{
   
      this.listMovie=[]
      this.msg=err.error.message;
      
    })
  }
  bookingSeat(id:number,movie:any,time:any){
    this.router.navigate([`/booking-seat`],{ queryParams: { scheduleId: `${id}`} })
    this.movieService.selectedMovie=movie
    this.movieService.selectedSchedule=id
    this.movieService.selectedTime=time
  }
  navigateToDetail(movieId:number){
    this.router.navigate([`/movie-detail`],{ queryParams: { movieID: `${movieId}`} })
  }
  
}
