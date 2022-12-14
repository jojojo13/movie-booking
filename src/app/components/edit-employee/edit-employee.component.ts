import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  user: any;
  updatedForm: any;
  isLoaded = false;
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserByID(parseInt(this.route.snapshot.paramMap.get('id') as string))
      .subscribe((response) => {
        this.user = response;

        this.updatedForm = this.fb.group(
          {
            username: [
              { value: this.user.username, disabled: true },
              [Validators.required, Validators.minLength(6)],
            ],
            // password: ['',[Validators.required, Validators.minLength(6)]],
            // repassword: ['', [Validators.required, Validators.minLength(6)]],
            fullName: [this.user.fullName, Validators.required],
            dateOfBirth: [this.user.dateOfBirth, Validators.required],
            gender: [this.user.gender.toString(), [Validators.required]],
            identityCard: [
              { value: this.user.identityCard, disabled: true },
              [Validators.required],
            ],
            email: [
              { value: this.user.email, disabled: true },
              [Validators.required],
            ],
            address: [this.user.address],
            phoneNumber: [{value:this.user.phoneNumber,disabled:true}, Validators.required],
          }
          // { validator: this.passwordMatchValidator }
        );
        this.isLoaded = true;
      });
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['repassword'].value
      ? null
      : { mismatch: true };
  }
  onSubmit() {
    this.user.address = this.updatedForm.value.address;
    this.user.dateOfBirth = this.updatedForm.value.dateOfBirth;
    this.user.gender = parseInt(this.updatedForm.value.gender);
    this.user.fullName = this.updatedForm.value.fullName;
    // this.user.identityCard='909092222'
    // this.user.phoneNumber = this.updatedForm.value.phoneNumber;

    this.isLoaded = false;
    this.userService.updateUserProfile(this.user).subscribe(
      (response) => {
        this.isLoaded = true;
        Swal.fire({
          icon: 'success',
          title: 'Update successfully',
        });
   
        this.router.navigateByUrl('/admin/employee')
      },
      (err) => {
        this.isLoaded = true;
        Swal.fire({
          icon: 'error',
          title: 'Update failed',
          text: 'Your phone is exsisted',
        });
      }
    );
  }
}
