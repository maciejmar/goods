import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {


private apiUrl = 'http://localhost:5001'; // Replace with your API URL

constructor(private http: HttpClient) {}

  getUserItems() {
    return this.http.get(`${this.apiUrl}/user/items`);
  }

  saveItem(item: any): Observable<any> {
    const url = `${this.apiUrl}/dashboard/new-item`; // Replace 'items' with your API endpoint for saving items
    return this.http.post(url, item);
  }
  showAll(): Observable<any>{
    const url = `${this.apiUrl}/showAllItems`
   return this.http.get(url)
  }
}
