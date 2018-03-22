import { Injectable } from "@angular/core";
import { Http ,Response,Headers} from '@angular/http';
import 'rxjs/Rx';

import { User } from "../models/user";
import { Subject } from "rxjs/Subject";
import { Car } from "../models/car";


@Injectable()
export class AdminService{
    user:User[]=[];
    car:Car;
    userchanged = new Subject<User[]>();

   
constructor(private http:Http){}

//Get Users
getUser(){
        return this.http.get('http://localhost:3000/admin/index')
                .map(res =>res.json()
                );
    }

//Search User
searchUser(searchUser){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/admin/index/search',{searchUser},{headers:headers})
                 .map((res:Response) =>{
                     return res;
                 }
                 ).subscribe((response:Response)=>{
                    this.user=response.json();
                    this.userchanged.next(this.user);
                });
}    

//Get Cars
getCar(){
    return this.http.get('http://localhost:3000/displayCar')
                .map(res =>res.json()
                );
    } 

//Add Car    
addCar(newCar){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/displayCar',newCar,{headers:headers})
    .map(res =>res.json());
}

//Delete Car
deleteCar(id){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
    return this.http.delete('http://localhost:3000/'+id,{headers:headers})
.map((res:Response)=>{return res.json()});
}

//Selected Car
selectedCar(id){
   return this.http.get('http://localhost:3000/'+id+'/modify')
     .map(res=>res.json());
}

//Update Car
updateCar(updatedCar,id){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
  return this.http.put('http://localhost:3000/'+id,updatedCar,{headers:headers})
  .map((res:Response)=>{return res.json()});
}

//Get Offers
getOffer(){
    return this.http.get('http://localhost:3000/admin/coupon')
    .map(res =>res.json()
    );
}   

//Add Offer
addOffer(newOffer){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/admin/coupon',newOffer,{headers:headers})
    .map(res =>res.json());
}

//User approval
getApproval(approval,id){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
  return this.http.put('http://localhost:3000/admin/approve/'+id,{approval},{headers:headers})
  .map((res:Response)=>{
      return res.json()
    });
}

//User Disable
userDisable(disable,id){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
  return this.http.put('http://localhost:3000/admin/disable/'+id,{disable},{headers:headers})
  .map((res:Response)=>{
      return res.json()
    });
}

//Get Distinct Cities
getDistinctCities(){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
  return this.http.get('http://localhost:3000/getcities',{headers:headers})
  .map((res:Response)=>{
      return res.json()
    });
}

filter(dcities:string[]){
    let header = new Headers;
    header.append('Content-Type', 'application/json');
    this.http.post("http://localhost:3000/filters",dcities, { headers: header }).map(
        (response:Response)=>{
            return response;
        }
    ).subscribe((response:Response)=>{
        this.user=response.json();
        this.userchanged.next(this.user);
    })
}

}