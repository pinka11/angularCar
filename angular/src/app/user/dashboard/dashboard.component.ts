import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Car } from '../../models/car';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 cars:Car[];
 public days:any
 public msg:string;

  constructor(private userService :UserService,
  private router:Router,
private route:ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm) {
    const value=f.value;
    const findCar={
      fdate:value.fdate,
      tdate:value.tdate,
      fcity:value.fcity,
      tcity:value.tcity,
      type:value.type
    }
    if(new Date(findCar.tdate).getTime()<new Date(findCar.fdate).getTime()){
      this.msg="to-date can't be greater than from-date"
    }else if(new Date(findCar.fdate).getTime()<new Date().getTime()){
      this.msg="Travel with time"
    }else{
      this.userService.availableCar(findCar).subscribe(
        (car:Car[])=>{
          this.cars=car;
        }
      )
    } 
  }

}
