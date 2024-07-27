import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5001'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) { }

  // getItems(currentPage: number, itemsPerPage: number, filterCategory: string, sortField: string, sortOrder: number): Observable<any> {
  //   const url = `${this.apiUrl}/items`;
  //   const params = {
  //     currentPage: currentPage.toString(),
  //     itemsPerPage: itemsPerPage.toString(),
  //     filterCategory,
  //     sortField,
  //     sortOrder
  //   };

  //   return this.http.get<any>(url, { params });
  // }

  // getItem(itemId: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/items/${itemId}`);
  // }

  // getUserItems(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/user-items`);
  // }

  // getOtherUsersItems(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/other-users-items`);
  // }
  // // Other methods in your ApiService

  // updateItemOwner(itemId: string, newOwnerId: string): Observable<any> {
  //   const url = `${this.apiUrl}/items/${itemId}/owner`;
  //   const body = { ownerId: newOwnerId };

  //   return this.http.put<any>(url, body);
  // }
  // Add other API methods as needed
  // Implement other API methods as needed
  register(username:string, password:string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const data = {username,password}
    console.log('data in register - - - ',data)
    return this.http.post<any>(url, data);
  }

  login(username:string, password:string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const data ={username, password}
    return this.http.post<any>(url, data);
  }

  // getItems(): Observable<any> {
  //   const url = `${this.apiUrl}/items`;
  //   return this.http.get<any>(url);
  // }
  
  getItems(
    currentPage: number,
    itemsPerPage: number,
    filterCategory: string,
    sortField: string,
    sortOrder: number
  ): Observable<any> {
    const url = `${this.apiUrl}/items`;
    const params = {
      currentPage: currentPage.toString(),
      itemsPerPage: itemsPerPage.toString(),
      filterCategory,
      sortField,
      sortOrder
    };
  
    return this.http.get<any>(url, { params });
  }
  

  getItemDetail(itemId: string): Observable<any> {
    const url = `${this.apiUrl}/items/${itemId}`;
    return this.http.get<any>(url);
  }

  getMyItems(): Observable<any> {
    const url = `${this.apiUrl}/my-items`;
    return this.http.get<any>(url);
  }

  getOtherUserItems(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}/items`;
    return this.http.get<any>(url);
  }

  createItem(item: any): Observable<any> {
    const url = `${this.apiUrl}/items`;
    return this.http.post<any>(url, item);
  }

  deleteItem(itemId: string): Observable<any> {
    const url = `${this.apiUrl}/items/${itemId}`;
    return this.http.delete<any>(url);
  }

  updateItem(item: any): Observable<any> {
    const url = `${this.apiUrl}/items/${item.id}`;
    return this.http.put<any>(url, item);
  }

  updateItemOwner(itemId: string, newOwnerId: string): Observable<any> {
    const url = `${this.apiUrl}/items/${itemId}/owner`;
    const body = {
      ownerId: newOwnerId
    };
    return this.http.put<any>(url, body);
  }
  getDashboardData(): Observable<any> {
    const url = `${this.apiUrl}/dashboard`;
    return this.http.get<any>(url);
  }

  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`;
    return this.http.post<any>(url, {});
  }


}
