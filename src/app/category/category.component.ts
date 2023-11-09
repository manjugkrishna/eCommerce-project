import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  items: any[] = [];
  filteredItems: any[] = [];

  constructor(private productService: ProductService, private activate: ActivatedRoute) {
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
    this.productService.addToCart(product)
    alert("Product added to cart")
  }
}
