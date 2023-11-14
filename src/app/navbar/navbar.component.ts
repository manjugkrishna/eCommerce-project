import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartProducts: any[] = [];
  isCartOpen: boolean = false;
  isLoggedIn: boolean = false;
  categories = ['Mobile', 'Camera', 'Earphones'];
  selectedCategory: string;


  constructor(private productService: ProductService,private authService: AuthService, private router: Router) {
    this.cartProducts = this.productService.cart;
    this.selectedCategory = this.categories[0];
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    console.log(this.cartProducts)
  }
  
  navigate(item: string) {
    this.selectedCategory = item;
    this.router.navigate(['/category', item]);
  }
  toggleLogin() {
    if (this.isLoggedIn) {
      // Perform logout logic
      this.authService.logout();
      // Redirect to the login page or any other page
      this.router.navigate(['/login']);
    } else {
      // Redirect to the login page
      this.router.navigate(['/login']);
    }
  }


}
