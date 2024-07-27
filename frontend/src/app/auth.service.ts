import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'


@Injectable({
  providedIn: 'root'
 })
export class AuthService {

    constructor() { }

  

    
    isLoggedIn(): boolean {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenPayload: any = jwt_decode(token);
        const expirationDate = new Date(tokenPayload.exp * 1000);
    
        if (expirationDate <= new Date()) {
          console.log('Token has expired, user not logged in');
          return false;
        }
    
        return true;
      }
      console.log('The token has been lost')
      return false;
    }
    
}  
