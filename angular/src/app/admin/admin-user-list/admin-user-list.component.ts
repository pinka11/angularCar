import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AdminService } from '../admin.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
providers:[AdminService]
})
export class AdminUserListComponent implements OnInit {
  users:User[]=[];
  dcity:string[]=[];
  selectedCity:string[]=[];
 
  constructor(private adminService:AdminService,
  private router:Router) { }


  ngOnInit() {
    this.adminService.getUser().subscribe(
      (users)=>{
        for(let user of users){
           if(user.username!=='admin'){
             this.users.push(user);
           }
        }
      });
      this.adminService.userchanged.subscribe(
        (response)=>{
          for(let user of response){
            if(user.username =='admin'){
              let index = response.findIndex(el => el.username == 'admin');
              response.splice(index,1);
            }
         }
          this.users=response;
        }
      )
    this.adminService.getDistinctCities().subscribe(
      (city)=>{
        for(let cities of city ){
          this.dcity.push(cities);
        }
      }
    )
  }

  onSubmit(f:NgForm) {
    console.log("form value",f.value.name)
      this.adminService.searchUser(f.value.name);
  }

  onFilter(f:NgForm){
    this.adminService.filter(this.selectedCity);
  }

  getApprove(approval,id,i){
    this.adminService.getApproval(approval,id).subscribe(
      (user:User)=>{
        this.users[i].approval=! this.users[i].approval
        this.router.navigate(['/admin/index'])
      }
    )
  }

  DisableNEnable(disable,id,i){
    this.adminService.userDisable(disable,id).subscribe(
      (user:User)=>{
        this.users[i].disable=! this.users[i].disable
        this.router.navigate(['/admin/index'])
      }
    )
  }


  onchange(name: string) {
    let add = true;
    this.selectedCity.forEach(function (city) {
      if (city == name) {
        add = false;
      }
    }
    )
    if (add) {
      this.selectedCity.push(name);
    }
    else {
      this.selectedCity.splice(this.selectedCity.indexOf(name), 1)
    }

  }


}
