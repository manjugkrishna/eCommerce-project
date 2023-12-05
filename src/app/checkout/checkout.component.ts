import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  billingForm!:FormGroup
  isSubmitted = false;
  existingAddress: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService,private addressService:AddressService) {
    this.billingForm = this.formBuilder.group({
      address: ['', [Validators.required, Validators.maxLength(30)]],
       city: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]], 
      country: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]], 
     state: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]], 
     postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]] 
   });
  }
  ngOnInit(): void {
    this.addressService.getAddress().subscribe(
      (response: any) => {
        this.existingAddress = response.Address;
 
     
        if (this.existingAddress) {
          this.populateFormWithAddress(this.existingAddress);
        }
      },
      (error: any) => {
        console.error('Error fetching existing address:', error);
      }
    );
  }

  get fc() {
    return this.billingForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.billingForm.valid) {
        const addressData = this.billingForm.value;
        console.log(addressData);

        if (this.existingAddress) {
            this.addressService.updateAddress(this.existingAddress.id, addressData).subscribe(
                (response) => {
                    alert("Address Updated")
                    this.router.navigate(["order"])
                    console.log('Address updated:', response);
                },
                (error: any) => {
                    this.showErrorAlert(error)
                    console.error('Error updating address:', error);
                }
            );
        } else {
            this.addressService.postAddress(addressData).subscribe(
                (response) => {
                    alert("Address Saved")
                    this.router.navigate(["order"])
                    console.log('Address saved:', response);
                },
                (error: any) => {
                    this.showErrorAlert(error)
                    console.error('Error saving address:', error);
                }
            );
        }
    } else {
        console.error("Form validation failed");
        this.showErrorAlert("Please fill in all required fields."); 
    }
}
  limitcodeLength(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    if (inputValue.length > 10) {
      input.value = inputValue.slice(0, 10);
    }
  }
  private showSuccessAlert(message:string) {
    Swal.fire({
      icon: 'success',
      title: 'Order Successful!',
      text: message,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['order']); 
      }
    });
  }
  populateFormWithAddress(address: any) {
    this.billingForm.patchValue({
      address: address.address,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode
    });
  }

  private showErrorAlert(errorMessage: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: errorMessage,
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
  }
}