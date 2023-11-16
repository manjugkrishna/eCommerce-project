import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: any[] = [];

  constructor(private http: HttpClient) {}

  registerUser(user: any): any {
    this.users.push(user);
    return this.http.post('http://localhost:3000/api/v1/signup', user)
  }

  async loginUser(email: string, password: string): Promise<any> {
    const dataToPass = {
      email,
      password
    };
  
    try {
      const res = await this.http.post('http://localhost:3000/api/v1/login', dataToPass).toPromise();
      const userData: any = res;
        return userData;
    } catch (error) {
      console.log('error', error);
      throw error; // You can handle errors as needed
    }
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser');
  }
}
