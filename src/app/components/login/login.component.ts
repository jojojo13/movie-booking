import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  message = '';
  isLoaded = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.isLoaded = false;
    (document?.querySelector('.overlay') as HTMLElement).style.display =
      'block';
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.authService.userSubject.next(true);
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
          this.isLoaded = true;
          console.log(response.data)
          if (response.data.role == 'Customer') {
            this.router.navigateByUrl('/user');
          } else {
            this.router.navigateByUrl('/admin');
          }
          this.authService.headerSubject.next(true)
        },
        (err) => {
          (document?.querySelector('.overlay') as HTMLElement).style.display =
            'none';
          this.isLoaded = true;
          this.message = 'Username or password wrong';
        }
      );
    }
  }
}
