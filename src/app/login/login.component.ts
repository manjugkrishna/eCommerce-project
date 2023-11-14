import { Component ,OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm!:FormGroup;
isSubmitted=false;
constructor(private formBuilder:FormBuilder,private router:Router,private authService: AuthService,private userService: UserService){

}
ngOnInit(): void {
  this.loginForm=this.formBuilder.group({
    email:['', [Validators.required,Validators.email,Validators.minLength(10),Validators.maxLength(30)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
      ],
    ],
  })
}
 get fc(){
    return this.loginForm.controls;
}
submit(){
  this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    if (this.userService.loginUser(email, password)) {
      this.authService.login();
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials. Please try again.');
    }
}

}
