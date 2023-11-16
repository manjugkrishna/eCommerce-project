import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartServiceService } from '../services/cart-service.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  items: any[] = [];
  filteredItems: any[] = [];

  constructor(private productService: ProductService, private activate: ActivatedRoute,private router: Router,
    private authService: AuthService,private cartService:CartServiceService) {
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
  addItemToCart(product: any) {
    this.cartService.addToCart(product._id, 1).subscribe({
      next: (res) => {
        console.log(res)
      alert("Item added to cart")
      },
      error: (err) => {
        alert('Unable to add. Please login')
      }
    })
  }
}
