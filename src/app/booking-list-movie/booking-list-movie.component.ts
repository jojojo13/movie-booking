import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/services/ticket/ticket.service';

@Component({
  selector: 'app-booking-list-movie',
  templateUrl: './booking-list-movie.component.html',
  styleUrls: ['./booking-list-movie.component.css']
})
export class BookingListMovieComponent implements OnInit {
  listTicket:any
  constructor(private ticketService:TicketService,private router:Router) { }

  ngOnInit(): void {
    this.ticketService.getAllTicket().subscribe(response=>{
      this.listTicket=response
      console.log(response)
    })
  }
  navigateToCf(ticket:any){
    this.ticketService.ticketSelected=ticket
    this.router.navigate(['/admin/booking-list',ticket.ticketId])
  }

}
