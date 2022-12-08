import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  registerForm: any;
  mess = '';
  isLoaded = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repassword: ['', [Validators.required, Validators.minLength(6)]],
        fullName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        gender: ['', [Validators.required]],
        identityCard: ['', [Validators.required]],
        email: ['', [Validators.required]],
        address: [''],
        phoneNumber: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }
  onSubmit() {
    (document?.querySelector('.overlay') as HTMLElement).style.display =
    'block';
    this.isLoaded = false;
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
          this.isLoaded = true;
          Swal.fire({
            icon: 'success',
            title: 'Add employee successfully',
          }).then(() => {
            this.router.navigateByUrl('/admin/employee');
          });
        },

        (err) => {
          (document?.querySelector('.overlay') as HTMLElement).style.display =
          'none';
          this.isLoaded = true;
          this.mess = err.error.message;
          Swal.fire({
            icon: 'error',
            title: 'Add failed!!!',
            text: err.error.message,
          });
        }
      );
    }
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['repassword'].value
      ? null
      : { mismatch: true };
  }
}
