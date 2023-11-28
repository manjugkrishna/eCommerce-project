import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {
    this.orderService.getUserOrders().subscribe((res)=>{
      console.log('order from db',res)    
    })
  }

  ngOnInit(): void {
    this.loadOrders();
  }
  

  loadOrders(): void {
    this.orderService.getUserOrders().subscribe((result: any) => {
      console.log(result.orders)
      this.orders = result.orders
    })
        
  }
}
