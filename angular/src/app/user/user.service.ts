import { Injectable } from "@angular/core";
import { Http ,Response,Headers} from '@angular/http';
import 'rxjs/Rx';

import { User } from "../models/user";
import { Subject } from "rxjs/Subject";
import { Car } from "../models/car";


@Injectable()
export class UserService{
    user:User;
    car:Car;
    public users:any;
    public paymentStatus:any;
    public userDetail:any;
    public authToken:any;
    public days:any;
    public amount:any

    
constructor(private http:Http){}

//Availble Cars
availableCar(findCar){
    this.days=Math.abs(new Date(findCar.tdate).getTime()-new Date(findCar.fdate).getTime())/(1000*24*3600);
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/user/availablecar',findCar,{headers:headers})
    .map(res =>res.json());
}

//Book car
carBook(id1,id2,p){
    this.amount=this.days*p;
    console.log("amount",this.amount);
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/user/'+id1+'/'+id2+'/book',{headers:headers})
    .map((res:Response) =>{
        this.userDetail=res.json();
        console.log("service",this.userDetail)
        return res.json();
    });
}

//Register New User
addUser(newUser){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/registration',newUser,{headers:headers})
    .map(res =>res.json());
}

//User Login
login(user){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/login',JSON.stringify(user),{headers:headers})
    .map((res:Response) =>{
        localStorage.setItem('id_token',res.json().token);
        localStorage.setItem('user',JSON.stringify(res.json().user));
        this.users=res.json().user;
        this.authToken=res.json().token;
       return res.json();
});
}

//Card Details
CardDetail(){
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/user/payment',{headers:headers})
    .map((res:Response) =>{
        console.log("aaa",res.json())
        return res.json();
    });

}

//Payment Status
PaymentStatus(cardno){
    console.log("hello",cardno)
    let headers=new Headers;
    headers.append('Content-Type','application/json'); 
    return this.http.post('http://localhost:3000/user/paymentStatus',{cardno},{headers:headers})
    .map((res:Response) =>{
        this.paymentStatus=res.json();
        console.log(this.paymentStatus)
        return res.json();
    });
}

//logout
onLogout(){
    if(this.users){
         this.http.get('http://localhost:3000/logout')
        .subscribe((res:Response) =>{
    });
    this.users=undefined;
    this.authToken=undefined;
    localStorage.clear();
    }
}
}