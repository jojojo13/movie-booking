import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchTxt!: string;
  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
   
    this.auth.headerSubject.subscribe((change)=>{
      if (localStorage.getItem('token') != null) {
        this.auth.getUserInfo().subscribe((res: any) => {
          this.auth.user = res;
          
          this.auth.userSubject.next(true)
        });
      } else {
        this.auth.user = undefined;
      }
    })

  }
  search(text: string) {
    this.router.navigate(['/search'], {
      queryParams: { keyword: this.searchTxt },
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.auth.userSubject.next(true);
    this.auth.headerSubject.next(true)
  }
  login(){
    this.router.navigateByUrl('/login');
  }
}
