import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/services/ticket/ticket.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  listBooking:any
  constructor(private ticketService:TicketService) { }

  ngOnInit(): void {
    this.ticketService.getBookingHistory().subscribe((response)=>{
     this.listBooking=response
     console.log(response)
    })
  }

}
