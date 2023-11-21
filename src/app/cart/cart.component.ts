import { OrderService } from './../services/order.service';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { CartServiceService } from '../services/cart-service.service';
import { Router } from '@angular/router';

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
    private cartService: CartServiceService,private orderService:OrderService,private router:Router) {
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
        next: () => {
          console.log('subtracted');
        }
      });
    } else {
      this.removeItem(item, this.cartProducts.indexOf(item));
    }
  }
  
  removeItem(item: any, index: number) {
    this.cartProducts.splice(index, 1);
    this.cartService.removeFromCart(item.productId._id).subscribe({
      next: () => {
        console.log('removed');
      }
    });
  }
  orderNow() {
    this.orderService.placeOrder(this.cartProducts).subscribe({
      next: (order) => {
        alert('Order placed successfully:');
        this.router.navigate(['/order'])
      },
      error: (error) => {
        console.error('Error placing order:', error);
      }
    });
  }
  
  getSubtotal(): number {
    let sum = 0;
    this.cartProducts.forEach(item => {
      if (item.productId && item.productId.productPrice) {
        sum += item.quantity * item.productId.productPrice;
      }
    });
    return sum;
  }
}