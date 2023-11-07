import { Component,OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eCommerce';
  cartProducts :any[]=[]

  constructor(private productService:ProductService){
    this.loadCart();
  }

  ngOnInit():void{
     this.loadCart();
  }
  loadCart(){
     this.cartProducts= this.productService.cart
     
   }
}
