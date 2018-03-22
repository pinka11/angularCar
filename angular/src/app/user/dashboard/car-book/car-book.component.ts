import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-book',
  templateUrl: './car-book.component.html',
  styleUrls: ['./car-book.component.css']
})
export class CarBookComponent implements OnInit {
  confirm:boolean=false;

  constructor(public userService:UserService,
  private router:Router) { }

  ngOnInit() {
    
  }
  
  onConfirm(){
    this.confirm=!this.confirm;
  }

  onSubmit(f:NgForm) {
    const value=f.value;
      this.userService.CardDetail().subscribe(
        (CardDetail)=>{
          this.router.navigate(['/user/payment'])
        }
      )
  }
}
