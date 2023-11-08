import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { CartComponent } from './cart/cart.component';
import { SaleComponent } from './sale/sale.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path:'products',
    component:HomeComponent
  },
  {
    path:'category/:categoryname',
    component:CategoryComponent
  },
  // {
  //   path:'category/:categoryname',
  //   component:NavbarComponent
  // },
  {
    path:'sale',
    component:SaleComponent
  },
  {
    path:'contact-us',
    component:ContactUsComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signUp',
    component:SignUpComponent
  },
  {
    path:"**",
    component:HomeComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
