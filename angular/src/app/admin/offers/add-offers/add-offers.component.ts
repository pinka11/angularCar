import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Offer } from '../../../models/offer';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.css']
})
export class AddOffersComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm) {
    const value=f.value;
    console.log("Offer...",value);
    const newOffer={
      cname:value.cname,
      cdiscount:value.cdiscount,
      ccode:value.ccode,
    }
      this.adminService.addOffer(newOffer).subscribe(
        (offer:Offer)=>{
          this.router.navigate(['/admin/coupon'])
        }
      )
  }

}
