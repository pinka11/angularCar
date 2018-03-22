import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';
import { Car } from '../../models/car';
import { Router ,ActivatedRoute} from '@angular/router';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  providers:[AdminService]
})
export class CarListComponent implements OnInit {
  cars:Car[]=[];
  constructor(private adminService:AdminService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.adminService.getCar().subscribe(
      (cars)=>{
       this.cars=cars;
      });
  }

  OnDelete(id:string){
    let index=this.cars.findIndex(car=>car._id==id);
     this.cars.splice(index,1);
    this.adminService.deleteCar(id).subscribe(
      (car:Car)=>{ 
      }
    );
  }
}
