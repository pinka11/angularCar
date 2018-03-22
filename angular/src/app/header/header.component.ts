import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService:UserService,
  private router:Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.userService.onLogout();
    this.router.navigate(['']);
  }

}
