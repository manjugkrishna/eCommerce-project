import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 cartProducts:any[]=[];
 isCartOpen: boolean = false;

 constructor(private productService: ProductService) {
  this.cartProducts = this.productService.cart;
}



  toggleCartDropdown() {
    this.isCartOpen = !this.isCartOpen;
  }
 
  // onGetItemByCategory(id: number) {
  //   this.productService.getItemsByCategory(id)
  // }

}
