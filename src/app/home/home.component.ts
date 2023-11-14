import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[] = [];
  cartObj: any = this.productService.cart
  constructor(private productService: ProductService,private router:Router,private authService: AuthService ) {
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
  addItemToCart(product: any) {
    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.productService.addToCart(product);
        alert('Product added to cart');
      } else {
        // alert('User is not logged in. Please log in to add items to the cart.');
        // // Redirect to the login page
        this.router.navigate(['/login']);
      }
    });
  }
}
