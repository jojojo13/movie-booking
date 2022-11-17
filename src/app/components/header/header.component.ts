import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchTxt!:string
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  search(text:string){
    this.router.navigate([ '/search' ], { queryParams: { keyword:this.searchTxt } })
  }
}
