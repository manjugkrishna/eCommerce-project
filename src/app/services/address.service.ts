import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'http://localhost:3000/api/v1';
  constructor(private http: HttpClient) {}

 
  postAddress(addressData: object): Observable<any> {
    return this.http.post(`${this.apiUrl}/address`, addressData);// To create a new address
  }
 
  getAddress(): Observable<any> {
    return this.http.get(`${this.apiUrl}/address`);// Get the user's address
  }
 
  updateAddress(addressId: string, addressData: object): Observable<any> {
    return this.http.patch(`${this.apiUrl}/address/${addressId}`, addressData);// Update an existing address
  }
}

