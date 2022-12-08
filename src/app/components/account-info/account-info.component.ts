import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';
import Swal from 'sweetalert2';

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
          
          this.updatedForm = this.fb.group(
            {
              username: [
                {value:this.user.username,disabled:true},
                [Validators.required, Validators.minLength(6)],
              ],
              // password: ['',[Validators.required, Validators.minLength(6)]],
              // repassword: ['', [Validators.required, Validators.minLength(6)]],
              fullName: [this.user.fullName, Validators.required],
              dateOfBirth: [this.user.dateOfBirth, Validators.required],
              gender: [this.user.gender.toString(), [Validators.required]],
              identityCard: [{value:this.user.identityCard,disabled:true}, [Validators.required]],
              email: [{value:this.user.email,disabled:true}, [Validators.required]],
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
  onSubmit(){
    this.user.address=this.updatedForm.value.address
    this.user.dateOfBirth=this.updatedForm.value.dateOfBirth
    this.user.gender=parseInt(this.updatedForm.value.gender) 
    this.user.fullName=this.updatedForm.value.fullName
    this.user.identityCard=this.updatedForm.value.identityCard
    this.user.phoneNumber=this.updatedForm.value.phoneNumber

    this.isLoaded=false
    this.userService.updateUserProfile(this.user).subscribe((response)=>{
      this.isLoaded=true
      Swal.fire({
        icon: 'success',
        title: 'Update successfully',
      
      });
      this.ngOnInit()
      this.auth.userSubject.next(true)
    },err=>{
      this.isLoaded=true
      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        text: 'Your phone is exsisted',
      });
    })
    
  }
}
