import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AdminService } from '../../admin.service';
import { Car } from '../../../models/car';
import { Router ,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  constructor(private adminService:AdminService,
    private router:Router,
  private route:ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm) {
    const value=f.value;
    const newCar={
      name:value.name,
      type:value.type,
      price:value.price,
      image:value.image
    }
      this.adminService.addCar(newCar).subscribe(
        (car:Car)=>{
          this.router.navigate(['../displayCar'],{relativeTo:this.route})
        }
      )
  }
}
