import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { UserService } from '../user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private userService:UserService,
  private router:Router) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm) {
    const value=f.value;
    const newUser={
      name:value.name,
      phone:value.phoneNo,
      gender:value.gender,
      dl:value.dl,
      dob:value.dob,
      username:value.username,
      email:value.email,
      state:value.state,
      city:value.city,
      pin:value.pin,
      password:value.password,
      approval:false,
      disable:false
    }
      this.userService.addUser(newUser).subscribe(
        (user:User)=>{
          this.router.navigate(['/login'])
        }
      )
  }

}
