import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { CartComponent } from './cart/cart.component';
// import { SaleComponent } from './sale/sale.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { OrderService } from './services/order.service';
import { OrderComponent } from './order/order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path:'home',
    component:LandingComponent
  },
  {
    path: 'products',
    component: HomeComponent
  },
  {
    path: 'category/:categoryname',
    component: CategoryComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "**",
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
