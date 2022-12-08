import { CommonService } from './../../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { SeatService } from 'src/services/seat/seat.service';
import { MovieServiceService } from 'src/services/movie-service.service';
import { CinemaService } from 'src/services/cinema/cinema.service';


@Component({
  selector: 'app-booking-seat',
  templateUrl: './booking-seat.component.html',
  styleUrls: ['./booking-seat.component.css'],
})
export class BookingSeatComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private seatService: SeatService,
    private route: ActivatedRoute,
    private router: Router,
    private movieService:MovieServiceService,
    public cinemaRoomService:CinemaService,
    private commonService:CommonService
  ) {
    this.listSelectedSeat = [];
  }
  total = 0;
  listSeatLeft: any;
  listSeatRight: any;
  listSeat: any;
  listSelectedSeat: any;
  ngOnInit(): void {
    this.seatService
      .getSeatByScheduleId(
        parseInt(this.route.snapshot.queryParamMap.get('scheduleId') as string)
      )
      .subscribe((data: any) => {
        this.listSeatLeft = data.filter((seat: any) => {
          return seat.position == 'left';
        });
        this.listSeatRight = data.filter((seat: any) => {
          return seat.position == 'right';
        });
  
        this.cinemaRoomService.selectedCinemaRoom=data[0].cinemaRoom

        this.seatService
          .getEmptySeat(
            parseInt(
              this.route.snapshot.queryParamMap.get('scheduleId') as string
            )
          )
          .subscribe((empty: any) => {
            let ids = empty.map((seat: any) => seat.seatId);

            ids.forEach((id: number) => {
              let elementPos = data
                .map(function (x: any) {
                  return x.seatId;
                })
                .indexOf(id);
              if (elementPos > -1) {
                data[elementPos].isEmpty = true;
              }
            });
          });
      });
  }
  toggleClass(event: any, className: string, seat: any) {
    const hasClass = event.target.classList.contains(className);
    if (!event.target.classList.contains('unavailable')) {
      if (hasClass) {
        this.total -= 50;
        this.renderer.removeClass(event.target, className);
        let index = this.listSelectedSeat.indexOf(seat);
        this.listSelectedSeat.splice(index, 1);
      } else {
        if (event.target.classList.contains('vip')) {
          this.total += 150000;
        } else {
          this.total += 70000;
        }
        this.renderer.addClass(event.target, className);
        this.listSelectedSeat.push(seat);
      }
    }
  }
  bookNow() {
    if(this.listSelectedSeat.length==0){
     this.commonService.popUpFailed('You must choose seat before booking')
    }else{
      this.router.navigateByUrl('/confirm-ticket');
      this.movieService.selectedSeat=this.listSelectedSeat
      this.movieService.totalPrice=this.total;
    }
   
  }
}
