import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: any[] = [];
  subtotal: number = 0;

  isCartOpen: boolean = false;
  constructor(private productService: ProductService) {
    this.cartProducts = this.productService.cart;

  }
  toggleCartDropdown() {
    this.isCartOpen = !this.isCartOpen;
  }

}