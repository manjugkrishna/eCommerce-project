import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartServiceService } from '../services/cart-service.service';
import { UserService } from '../services/user.service';
import{ProductData} from "../interfaces/product"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[] = [];
  cartObj: any = this.productService.cart
  constructor(
    private productService: ProductService, 
    private router: Router, 
    private authService: AuthService,
    private cartService: CartServiceService) {
  }
  ngOnInit(): void {
    this.loadAllProducts()
  }
  loadAllProducts() {
    this.productService.getAllProducts().subscribe((result: any) => {
      console.log(result.data)
      this.productList = result.data
    })
  }
  addItemToCart(product: ProductData) {
    this.cartService.addToCart(product.id, 1).subscribe({
      next: (res) => {
        console.log(res)
      alert("Item added to cart")
      },
      error: (err) => {
        console.log(err);
        
        alert(err.error.message)
        // alert('Unable to add. Please login')
        this.router.navigate(['/login']);
      }
    })
  }
}
