import { Router } from '@angular/router';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  listCinema:any
  isLoaded=false
  itemsPerPage = 2;
  totalItems!: number;
  page: number = 1;
  constructor(private cinemaService:CinemaService,private router:Router) { }

  ngOnInit(): void {
    this.loadData()
  }
  naigateTo(cinemaID:number){
    this.router.navigate([`admin/cinema/seat`],{ queryParams: { cinemaID: `${cinemaID}`} })
  }
  loadData(){
    this.cinemaService.getAllCinema(this.page - 1, this.itemsPerPage).subscribe((response:any)=>{
      this.listCinema=response.cinemas
      this.isLoaded=true
      this.totalItems = response.totalItem;
      console.log(this.listCinema)
    },err=>{
      this.isLoaded=true
    })
  }
  gty(event:any){
    this.loadData();
  }
}
