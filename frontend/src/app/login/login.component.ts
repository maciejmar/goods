import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  username: string='';
  password: string='';
  loading = false;
  error = '';

  constructor( private http:HttpClient, private formBuilder: FormBuilder, private router: Router, private apiService: ApiService ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }
  
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    const data = {'username': this.formControls['username'].value, 
    'password':this.formControls['password'].value
    }
    const username = this.formControls['username'].value
    const password = this.formControls['password'].value
    console.log ('data in login ', data)
    this.apiService.login(username, password)
      .subscribe(
        () => {
          this.loading = false;
          // Redirect to the desired page after successful login
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.loading = false;
          this.error = error.message || 'Login failed. Please try again.';
        }
      );
  }

}
