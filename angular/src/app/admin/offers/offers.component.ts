import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';
import { Offer } from '../../models/offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers:Offer[]=[];

  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.adminService.getOffer().subscribe(
      (offers)=>{
       this.offers=offers;
      });
  }

}
