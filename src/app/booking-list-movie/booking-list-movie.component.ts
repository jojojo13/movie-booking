import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/services/ticket/ticket.service';

@Component({
  selector: 'app-booking-list-movie',
  templateUrl: './booking-list-movie.component.html',
  styleUrls: ['./booking-list-movie.component.css']
})
export class BookingListMovieComponent implements OnInit {
  listTicket:any
  constructor(private ticketService:TicketService) { }

  ngOnInit(): void {
    this.ticketService.getAllTicket().subscribe(response=>{
      this.listTicket=response
      console.log(response)
    })
  }

}
