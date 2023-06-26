import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service'; // Replace with your actual API service
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module'
import { Router } from '@angular/router'


//import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Router } from '@angular/router';
//import { ApiService } from 'path-to-api-service'; // Replace with the correct path to the ApiService

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      console.log('invalid registration!!!')
      return;
    }
    console.log('onsubmit - registration')
    console.log('this registrationForm ', this.registrationForm.value['password'])
    this.loading = true;
    this.apiService.register(this.registrationForm.value['username'],this.registrationForm.value['password'])
      .subscribe({
        next:
        () => {
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error:
        error=> {
          this.loading = false;
          error = error.message || 'Registration failed. Please try again.';
        }
  });
  }
}





  // username: string = '';
  // password: string = '';

 
  // registrationForm!: FormGroup;
  // loading = false;
  // error = '';

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private router: Router,
  //   private apiService: ApiService,
    
    
    
  // ) {}

  // ngOnInit() {
  //   this.registrationForm = this.formBuilder.group({
  //     username: ['', [Validators.required, Validators.minLength(4)]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     email: ['', [Validators.required, Validators.email]]
  //   });
  // }

  // get formControls() {
  //   return this.registrationForm.controls;
  // }

  // onSubmit() {
  //   if (this.registrationForm.invalid) {
  //     return;
  //   }

  //   this.loading = true;
  //   console.log('reg')
  //   console.log('regist component ', this.registrationForm.value)
  //   this.apiService.register(this.registrationForm.value)
  //     .subscribe({next:
  //       () => {
  //         this.loading = false;
  //         this.router.navigate(['/login']);
  //       },
  //       error:
  //       err => {
  //         this.loading = false;
  //         err= err.message || 'Registration failed. Please try again.';
  //       } 
  //     });
  // }

