import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService) { }
  check = this.userService.getCurrentUser().token ? true : false
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.check);
  isLoggedIn= this.isLoggedInSubject.asObservable();
  login() {
    this.isLoggedInSubject.next(true);
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.userService.setCurrentUser({})
  }

}
