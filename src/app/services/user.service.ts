import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: any[] = [];

  registerUser(user: any): void {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  loginUser(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser');
  }
}
