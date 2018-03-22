import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  public key:boolean=false;
  constructor(private userService:UserService) { }

  ngOnInit() {
    if(this.userService.paymentStatus=='successful'){
      this.key =true;
    }else{
      this.key=false;
    }

  }

}
