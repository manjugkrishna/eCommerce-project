import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }
  // oadAllProducts() {
  //   this.productService.getAllProducts().subscribe((result: any) => {
  //     console.log(result.data)
  //     this.productList = result.data
  //   })
  // }

  loadOrders(): void {
    this.orderService.getUserOrders().subscribe((result: any) => {
      console.log(result.data)
      this.orders = result.data
    })
      
   
  }
}
