import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: any[] = [];

  constructor(private productService: ProductService,private userService:UserService) {
    this.cartProducts = this.productService.cart;
  }

  incrementQuantity(item: any) {
    item.quantity = (item.quantity || 1) + 1;
  }

  decrementQuantity(item: any) {
    if (item.quantity && item.quantity > 1) {
      item.quantity -= 1;
    }
  }
  removeItem(index: number) {
    this.cartProducts.splice(index, 1);
  }
  getSubtotal(): number {
    return this.cartProducts.reduce((total, item) => {
      return total + (item.quantity || 1) * item.productPrice;
    }, 0);
  }
  private updateLocalStorage(): void {
    const currentUser = this.userService.getCurrentUser();
    const userId = currentUser ? currentUser.id : 'default';

    // Use userId to update the correct cart for the user
    localStorage.setItem(`cart_${userId}`, JSON.stringify(this.cartProducts));
  }
  addToCart(product: any): void {
    const currentUser = this.userService.getCurrentUser();
    const userId = currentUser ? currentUser.id : 'default'; // Use a default value for non-logged-in users

    // Use userId to differentiate between users
    let userCart = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
    
    // Add the product to the cart
    this.productService.addToCart(product);

    // Update the local storage
    this.updateLocalStorage();
  }
}