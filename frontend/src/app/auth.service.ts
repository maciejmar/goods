import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'
const jwt = require( 'jsonwebtoken')

@Injectable({
  providedIn: 'root'
 })
export class AuthService {

    constructor() { }

    isLoggedIn():boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = jwt_decode(token);
      const expiriationDate =new Date(jwt.tokenPayload.exp * 1000);

      if (expiriationDate <= new Date()){
        console.log('token is expired, user not logged in')
        return false
      }
    return true   
    }
   return false 
   } 
}  
