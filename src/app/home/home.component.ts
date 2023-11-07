import { Component ,OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList:any[]=[];
  
  cartObj:any=this.productService.cart
     constructor(private productService:ProductService){
       
     }
     ngOnInit(): void {
       this.loadAllProducts() 
     }
     loadAllProducts(){
      this.productService.getAllProducts().subscribe((result:any)=>{
        console.log(result.data)
        this.productList=result.data
      })
      
     }
     addItemToCart(product:any){
      
        this.productService.addToCart(product)
        alert("Product added to cart")
      
     }
     
}
