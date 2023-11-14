import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { PasswordValidators } from './password.validators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signupForm!: FormGroup;
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router,private userService: UserService ) {

  }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required,Validators.maxLength(20),Validators.minLength(5)],
      email: ['', [Validators.required, Validators.email,Validators.minLength(10),Validators.maxLength(30)]],
      mobileNumber: ['',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern(/^[0-9]*$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
        ],
      ],
      confirmPassword: ['', Validators.required]
    }, {
      validators: PasswordValidators.passwordShouldMatch('password', 'confirmPassword')

    })
  }
  get fc() {
    return this.signupForm.controls;
  }
  submit() {
    this.isSubmitted = true;
    if (this.signupForm.invalid) return;

    const user = this.signupForm.value;
    this.userService.registerUser(user);
    this.router.navigate(['/login']);

  }

  limitMNumberLength(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    if (inputValue.length > 10) {
      input.value = inputValue.slice(0, 10);
    }
  }
}
