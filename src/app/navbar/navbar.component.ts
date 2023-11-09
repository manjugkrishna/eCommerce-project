import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartProducts: any[] = [];
  isCartOpen: boolean = false;
  categories = ['Mobile', 'Camera', 'Earphones'];
  selectedCategory: string;


  constructor(private productService: ProductService, private router: Router) {
    this.cartProducts = this.productService.cart;
    this.selectedCategory = this.categories[0];
    console.log(this.cartProducts)
  }
  toggleCartDropdown() {
    this.isCartOpen = !this.isCartOpen;
  }
  navigate(item: string) {
    this.selectedCategory = item;
    this.router.navigate(['/category', item]);
  }
}
