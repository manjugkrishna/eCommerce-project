import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppComponent } from '../app.component';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  cartProducts: any[] = [];
  isCartOpen: boolean = false;
  isLoggedIn: boolean = false;
  categories = ['Mobile', 'Camera', 'Earphones'];
  selectedCategory: string;
  username: string = '';


  constructor(private productService: ProductService,
    private authService: AuthService, 
    private router: Router,private userService: UserService) {
    this.cartProducts = this.productService.cart;
    this.selectedCategory = this.categories[0];
    console.log(this.cartProducts)
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn) {      
      this.userService.getCurrentUserObservable().subscribe(data => this.username = data.user.name)
      console.log('currentUser',this.username)
    } else {
      console.log('not logged in')
      this.username = '';
    }
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn) {      
      this.userService.getCurrentUserObservable().subscribe(data => this.username = data.user.name)
      console.log('currentUser',this.username)
    } else {
      console.log('not logged in')
      this.username = '';
    }
  }
  
  navigate(item: string) {
    this.selectedCategory = item;
    this.router.navigate(['/category', item]);
  }
  toggleLogin() {
    if (this.isLoggedIn) {
      this.authService.logout();  
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }


}
