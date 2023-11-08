import { Component ,OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



loginForm!:FormGroup;
isSubmitted=false;
constructor(private formBuilder:FormBuilder,private router:Router){

}
ngOnInit(): void {
  this.loginForm=this.formBuilder.group({
    email:['', [Validators.required,Validators.email]],
    password:['',Validators.required]
  })
}
 get fc(){
    return this.loginForm.controls;
}
submit(){
  this.isSubmitted=true;
  if(this.loginForm.invalid) return;
  this.router.navigate(['/home']);
}

}
