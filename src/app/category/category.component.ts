import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  items: any[] = [];
  filteredItems: any[] = [];

  constructor(private productService: ProductService, private activate: ActivatedRoute,private router: Router,
    private authService: AuthService) {
    this.activate.params.subscribe((res: any) => {
      this.getFilteredItems()
    })
  }
  getFilteredItems() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.items = res.data;
      const categoryName = (this.activate.snapshot.params['categoryname']);
      this.filteredItems = this.items.filter(item => item.category === categoryName)
      console.log((this.filteredItems).length);
    })
  }
  addToCart(product: any) {
    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.productService.addToCart(product);
        alert('Product added to cart');
      } else {
        // alert('User is not logged in. Please log in to add items to the cart.');
        // Redirect to the login page
        this.router.navigate(['/login']);
      }
    });
  }
}
