import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserListComponent } from './admin/admin-user-list/admin-user-list.component';
import { CarListComponent } from './admin/car-list/car-list.component';
import { OffersComponent } from './admin/offers/offers.component';
import { HeaderComponent } from './header/header.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { appRoutingModule } from './app-routing.module';
import { AddCarComponent } from './admin/car-list/add-car/add-car.component';
import { HomeComponent } from './home/home.component';
import { ModifyCarComponent } from './admin/car-list/modify-car/modify-car.component';
import { AddOffersComponent } from './admin/offers/add-offers/add-offers.component';
import { HttpModule } from '@angular/http';
import { AdminService } from './admin/admin.service';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { UserService } from './user/user.service';
import { AvailableCarComponent } from './user/dashboard/available-car/available-car.component';
import { CarBookComponent } from './user/dashboard/car-book/car-book.component';
import { PaymentComponent } from './user/dashboard/payment/payment.component';
import { PaymentStatusComponent } from './user/dashboard/payment-status/payment-status.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { LoginComponent } from './login/login.component';
import { AdminAuthService } from './authService/admin.auth.service';
import { UserAuthService } from './authService/user.auth.service';




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminUserListComponent,
    CarListComponent,
    OffersComponent,
    HeaderComponent,
    AdminListComponent,
    AddCarComponent,
    HomeComponent,
    ModifyCarComponent,
    AddOffersComponent,
    UserComponent,
    DashboardComponent,
    AvailableCarComponent,
    CarBookComponent,
    PaymentComponent,
    PaymentStatusComponent,
    RegisterUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [AdminService,UserService,AdminAuthService,UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
