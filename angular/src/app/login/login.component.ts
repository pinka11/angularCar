import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // user : any

  constructor(private userService:UserService,
  private router:Router) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm) {
    const value=f.value;
    const user={
      username:value.username,
      password:value.password
    }
      this.userService.login(user).subscribe(
        (user)=>{
         if(user.success){
          if(user.user.username == 'admin'){
            this.router.navigate(['/admin']) 
           } else {
            this.router.navigate(['/user'])
           }
         }
         else{
          this.router.navigate([''])
         }
       
        }
      )
  }



}
