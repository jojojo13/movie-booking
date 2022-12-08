import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  constructor(private userService: UserService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.userSubject.subscribe((change) => {
      if (change) {
        this.userService
          .getUserByID(this.auth.user.id)
          .subscribe((response) => {
            this.user = response;

          });
      }
    });
  }
}
