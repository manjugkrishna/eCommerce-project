import { Injectable } from '@angular/core';
// import {Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 cart:any[]=[]
 
  constructor(private http:HttpClient) { }

  getAllProducts(){
        return this.http.get("http://localhost:3000/api/v1/products");
  }
  // addToCart(product: any) { 
  //   const existingItem = this.cart.find(item => item.productId === product.productId);

  //   if (existingItem) {
  //     // If the product is already in the cart, increment the quantity
  //     existingItem.quantity = (existingItem.quantity || 1) + 1;
  //   } else {
  //     // If the product is not in the cart, add it as a new item
  //     this.cart.push({ ...product, quantity: 1 });
  //   }
  // }
}