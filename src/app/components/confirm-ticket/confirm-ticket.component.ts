import { Component, OnInit } from '@angular/core';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { CommonService } from 'src/services/common.service';
import { MovieServiceService } from 'src/services/movie-service.service';
import { SeatService } from 'src/services/seat/seat.service';


@Component({
  selector: 'app-confirm-ticket',
  templateUrl: './confirm-ticket.component.html',
  styleUrls: ['./confirm-ticket.component.css']
})
export class ConfirmTicketComponent implements OnInit {
  isLoaded=true;

  constructor(private commonService:CommonService,public movieService:MovieServiceService,public cinemaRoomService:CinemaService,private seatService:SeatService) { }

  ngOnInit(): void {

  }
  bookSeat(){
    let obj={
      price:this.movieService.totalPrice,
      listSeat:this.movieService.selectedSeat
    }
    this.isLoaded=false;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
    'block';
    this.seatService.bookingSeat(obj,this.movieService.selectedSchedule).subscribe((response)=>{
      this.isLoaded=true;
      (document?.querySelector('.overlay') as HTMLElement).style.display =
      'none';
      this.commonService.popUpSuccess('Booking successfully')
    },err=>{
      (document?.querySelector('.overlay') as HTMLElement).style.display =
      'none';
      this.isLoaded=true
    })
  }

}
