import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public card:any;

  constructor(private userService:UserService,
  private router:Router) { }

  ngOnInit() {
  }
  onSubmit(f:NgForm) {
    const value=f.value;
  this.card={
      bankname:value.bankname,
      cardtype:value.cardtype,
      cardno:value.cardno,
      cvv:value.cvv
    }
      this.userService.PaymentStatus(this.card.cardno).subscribe(
        (res:Response)=>{
          console.log(res);
          this.router.navigate(['/user/paymentStatus'])
        }
      )
  }
}
