import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'item-exchange-app';
  isLoggedIn = false;
  loginForm = { username: '', password: '' };
  registerForm = { username: '', password: '' };
  currentUser: any;

  constructor(private apiService: ApiService, authService: AuthService) {}

  // login() {
  //   this.apiService.login(this.loginForm)
  //     .subscribe(response => {
  //       // Handle successful login
  //       console.log(response); // Example: Log the response or perform further actions
  //       this.isLoggedIn = true;
  //       this.currentUser = response.user; // Assuming the response contains user data
  //     }, error => {
  //       // Handle login error
  //       console.error(error); // Example: Log the error or display an error message
  //     });
  // }

  // register() {
  //   this.apiService.register(this.registerForm)
  //     .subscribe(response => {
  //       // Handle successful registration
  //       console.log(response); // Example: Log the response or perform further actions
  //       this.isLoggedIn = true;
  //       this.currentUser = response.user; // Assuming the response contains user data
  //     }, error => {
  //       // Handle registration error
  //       console.error(error); // Example: Log the error or display an error message
  //     });
  // }
}

 