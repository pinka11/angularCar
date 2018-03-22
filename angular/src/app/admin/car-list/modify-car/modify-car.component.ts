import { Component, OnInit } from '@angular/core';
import { Router ,Params,ActivatedRoute} from '@angular/router';

import { AdminService } from '../../admin.service';
import { Car } from '../../../models/car';
import { NgForm } from '@angular/forms/';
import 'rxjs/Rx';


@Component({
  selector: 'app-modify-car',
  templateUrl: './modify-car.component.html',
  styleUrls: ['./modify-car.component.css']
})
export class ModifyCarComponent implements OnInit {
  id:string;
  carName=''
   carImage=''
   carType=''
   carPrice:number

  constructor(private adminService:AdminService,
  private router:Router,
  private route:ActivatedRoute) { }

  ngOnInit() {
  
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=params['id'];
        const car=this.adminService.selectedCar(this.id).subscribe(
          (car:Car)=>{
            // console.log(car);
           this.carName=car.name;
           this. carImage=car.image;
           this.carType=car.type;
           this.carPrice=car.price;
          }
        )
      })
  }

  onSubmit(f:NgForm) {
    const value=f.value;
    console.log(f.value)
    const updatedCar={
      name:value.name,
      type:value.type,
      price:value.price,
      image:value.image
    }
    this.adminService.updateCar(updatedCar,this.id).subscribe(
      (car:Car)=>{
            this.router.navigate(['/admin/displayCar'])
            } 
      )    
  }

}
