import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: any[] = [];
  nullStr = 'Empty'

  constructor(
    private productService: ProductService,
    private userService:UserService,
    private cartService: CartServiceService) {
    this.cartService.getCart().subscribe((res) => {
      console.log('cart from db',res)
      this.cartProducts = res.data.items
    });
  }

  incrementQuantity(item: any) {
    item.quantity = (item.quantity || 1) + 1;
    this.cartService.addToCart(item.productId._id, 1).subscribe({
      next:() => {
        console.log('added')
        console.log(this.cartProducts)
      }
    })
  }

  decrementQuantity(item: any) {
    if (item.quantity && item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.addToCart(item.productId._id, -1).subscribe({
        next:() => {
          console.log('subtracted')
        }
      })
    }
  }
  removeItem(item: any, index:number) {
    this.cartProducts.splice(index, 1);
    this.cartService.removeFromCart(item.productId._id).subscribe({
      next:() => {
        console.log('removed')
      }
    })
  }
  // getSubtotal(): number {
  //   let sum = 0;
  //   this.cartProducts.forEach(item => {
  //     if (item.productId && item.productId.productPrice) {
  //       sum += item.quantity * item.productId.productPrice;
  //     }
  //   });
  //   return sum;
  // }
  // private updateLocalStorage(): void {
  //   const currentUser = this.userService.getCurrentUser();
  //   const userId = currentUser ? currentUser.id : 'default';

  //   // Use userId to update the correct cart for the user
  //   localStorage.setItem(`cart_${userId}`, JSON.stringify(this.cartProducts));
  // }
  
}