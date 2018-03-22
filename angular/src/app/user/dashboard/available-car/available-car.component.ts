import { Component, OnInit ,Input} from '@angular/core';
import { Car } from '../../../models/car';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-car',
  templateUrl: './available-car.component.html',
  styleUrls: ['./available-car.component.css']
})
export class AvailableCarComponent implements OnInit {
  @Input() car:Car;
  constructor(private userService:UserService,
  private router:Router) { }

  ngOnInit() {
 
  }

  onBook(){
    let id1=this.userService.users.id;
    let id2=this.car._id;
    let price=this.car.price;
    this.userService.carBook(id1,id2,price).subscribe(
      (userDetail)=>{
        if(userDetail){
          this.router.navigate(['/user/carBook'])
        }
      }
    )
  }

}
