import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-cinema-seat',
  templateUrl: './cinema-seat.component.html',
  styleUrls: ['./cinema-seat.component.css'],
})
export class CinemaSeatComponent implements OnInit {
  total = 0;
  cinemaID!: number;
  listSeatLeft: any;
  listSeatRight: any;
  selectedSeat: any;
  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private commonService:CommonService
  ) {
    this.selectedSeat = [];
  }

  ngOnInit(): void {
    this.cinemaID = parseInt(
      this.route.snapshot.queryParamMap.get('cinemaID') as string
    );
    this.cinemaService
      .getSeatByCinemaID(this.cinemaID)
      .subscribe((seats: any) => {
        console.log(seats)
        this.listSeatLeft = seats.filter((seat: any) => {
          return seat.position == 'left';
        });
        this.listSeatRight = seats.filter((seat: any) => {
          return seat.position == 'right';
        });
      });
  }
  toggleClass(event: any, className: string, seat: any) {
    const hasClass = event.target.classList.contains(className);
   
    seat.seatType=seat.seatType==1?0:1
    if (this.selectedSeat.includes(seat)) {
      let index = this.selectedSeat.indexOf(seat);
      this.selectedSeat.splice(index, 1);
    } else {
      this.selectedSeat.push(seat);
    }
    if (!event.target.classList.contains('unavailable')) {
      if (hasClass) {
        this.renderer.removeClass(event.target, className);
      } else {
        this.renderer.addClass(event.target, className);
      }
    }
  
  }
  updateSeat(){
    this.cinemaService.updateSeat(this.selectedSeat).subscribe((response)=>{
      this.commonService.popUpSuccess('Update sucessfully');
      this.ngOnInit()
    },(err)=>{
      this.commonService.popUpFailed('Update failed');
    })
  }
}
