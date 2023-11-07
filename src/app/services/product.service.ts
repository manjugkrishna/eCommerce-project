import { Injectable } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 cart:any[]=[]
 
  constructor(private http:HttpClient) { }

  getAllProducts(){
        return this.http.get("assets/data.json");
  }
  addToCart(product:any){
      this.cart.push(product)
      console.log("hi",this.cart)
  }
  // getItemsByCategory(id:number){
  // }
}