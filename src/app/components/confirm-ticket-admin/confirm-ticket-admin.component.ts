import { Router } from '@angular/router';
import { CommonService } from './../../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from 'src/services/movie-service.service';
import { TicketService } from 'src/services/ticket/ticket.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-confirm-ticket-admin',
  templateUrl: './confirm-ticket-admin.component.html',
  styleUrls: ['./confirm-ticket-admin.component.css']
})
export class ConfirmTicketAdminComponent implements OnInit {
  movie:any
  ticket:any
  user:any
  isLoaded=true;
  constructor(private router:Router,private commonService:CommonService,private movieService:MovieServiceService,private ticketService:TicketService,private userService:UserService) { }

  ngOnInit(): void {
   this.ticket=this.ticketService.ticketSelected
    this.movieService.getMovieByID(this.ticketService.ticketSelected.movie_id
      ).subscribe((response)=>{
        this.movie=response
  
    })
    this.userService.getUserByID(this.ticket.accountId).subscribe((response)=>{
     this.user=response
    })
  }
  confirm(){
    this.isLoaded=false
    this.ticketService.updateConfirmTicket(this.ticket.ticketId).subscribe((response)=>{
      this.isLoaded=true
      this.commonService.popUpSuccess('Confirm success')
      this.router.navigateByUrl('/admin/booking-list')
    },err=>{
      this.isLoaded=true
      this.commonService.popUpFailed('Confirm failed')
    })
  }
}
