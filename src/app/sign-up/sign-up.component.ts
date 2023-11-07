import { Component ,OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

signupForm!:FormGroup;
isSubmitted=false;
constructor(private formBuilder:FormBuilder){

}
ngOnInit(): void {
  this.signupForm=this.formBuilder.group({
    username:['',Validators.required],
    email:['', [Validators.required,Validators.email]],
    mobileNumber:['', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^[0-9]*$/)]
  ],
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
    return this.signupForm.controls;
}
submit(){
  this.isSubmitted=true;
  if(this.signupForm.invalid) return;
  console.log("hi")
  
}
limitMobileNumberLength(event: Event): void {
  const input = event.target as HTMLInputElement;
  const inputValue = input.value;
  if (inputValue.length > 10) {
    // If more than 10 digits, truncate the input value
    input.value = inputValue.slice(0, 10);
  }
}
}
