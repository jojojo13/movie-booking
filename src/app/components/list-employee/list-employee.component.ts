import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  listEmployee:any
  isLoaded = false;
  itemsPerPage = 2;
  totalItems!: number;
  page: number = 1;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.isLoaded=false
    this.userService.getAllUserAsEmployee(this.page - 1, this.itemsPerPage).subscribe(
      (response: any) => {
        this.listEmployee = response.employees;
        this.isLoaded = true;
        this.totalItems = response.totalItem;
     
      },
      (err) => {
        this.isLoaded = true;
      }
    );
  }
  gty(event:any){
    this.loadData();
  }
  navigateToEdit(accountId:number){
    this.router.navigate(['/admin/employee/edit',accountId])
  }
}
