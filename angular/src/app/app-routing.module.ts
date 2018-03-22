import { NgModule } from "@angular/core";
import {Routes,RouterModule,PreloadAllModules} from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { AdminUserListComponent } from "./admin/admin-user-list/admin-user-list.component";
import { CarListComponent } from "./admin/car-list/car-list.component";
import { OffersComponent } from "./admin/offers/offers.component";
import { AddCarComponent } from "./admin/car-list/add-car/add-car.component";
import { HomeComponent } from "./home/home.component";
import { ModifyCarComponent } from "./admin/car-list/modify-car/modify-car.component";
import { AddOffersComponent } from "./admin/offers/add-offers/add-offers.component";
import { UserComponent } from "./user/user.component";
import { DashboardComponent } from "./user/dashboard/dashboard.component";
import { AvailableCarComponent } from "./user/dashboard/available-car/available-car.component";
import { CarBookComponent } from "./user/dashboard/car-book/car-book.component";
import { PaymentComponent } from "./user/dashboard/payment/payment.component";
import { PaymentStatusComponent } from "./user/dashboard/payment-status/payment-status.component";
import { RegisterUserComponent } from "./user/register-user/register-user.component";
import { LoginComponent } from "./login/login.component";
import { AdminAuthService } from "./authService/admin.auth.service";
import { UserAuthService } from "./authService/user.auth.service";


const appRoutes:Routes = [
    {path:'',component:HomeComponent} ,  
    {path:'admin',component:AdminComponent,canActivate:[AdminAuthService],children:[
        {path:'index',component:AdminUserListComponent},
        {path:'displayCar',component:CarListComponent},
        {path:'addCar',component:AddCarComponent},
        {path:'coupon',component:OffersComponent},
        {path:'addCoupon',component:AddOffersComponent},        
        {path:'modifyCar/:id',component:ModifyCarComponent}            
    ]},
    {path:'user',component:UserComponent,children:[
        {path:'dashboard',component:DashboardComponent,canActivate:[UserAuthService]} ,
        {path:'registerUser',component:RegisterUserComponent},                   
        {path:'carBook',component:CarBookComponent,canActivate:[UserAuthService]} ,          
        {path:'payment',component:PaymentComponent}  ,
        {path:'paymentStatus',component:PaymentStatusComponent}           
    ]},
    {path:'login',component:LoginComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})
    ],

    exports:[RouterModule]
})
export class appRoutingModule{

}