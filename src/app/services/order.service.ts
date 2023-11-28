import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/api/v1'; // Adjust the API URL

  constructor(private http: HttpClient) { }

  placeOrder(cartItems: any[]): Observable<any> {
    const orderData = {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    return this.http.post<any>(`${this.apiUrl}/order`, orderData);
  }
  getUserOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/order`);
  }
}
