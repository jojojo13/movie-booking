import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit {
  user: any;
  updatedForm: any;
  isLoaded = false;
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.auth.userSubject.subscribe((change) => {
      if(change){
        this.userService.getUserByID(this.auth.user.id).subscribe((response) => {
          this.user = response;
          console.log(this.user);
          this.updatedForm = this.fb.group(
            {
              username: [
                this.user.username,
                [Validators.required, Validators.minLength(6)],
              ],
              // password: ['',[Validators.required, Validators.minLength(6)]],
              // repassword: ['', [Validators.required, Validators.minLength(6)]],
              fullName: [this.user.fullName, Validators.required],
              dateOfBirth: [this.user.dateOfBirth, Validators.required],
              gender: [this.user.gender, [Validators.required]],
              identityCard: [this.user.identityCard, [Validators.required]],
              email: [this.user.email, [Validators.required]],
              address: [this.user.address],
              phoneNumber: [this.user.phoneNumber, Validators.required],
            },
            // { validator: this.passwordMatchValidator }
          );
          this.isLoaded = true;
        });
      }
    
    });
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['repassword'].value
      ? null
      : { mismatch: true };
  }
}
