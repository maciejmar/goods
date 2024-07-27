import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService} from '../api.service'
import { ItemListComponent } from './item-list/item-list.component'
import { ItemserviceService } from '../itemservice.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items:any[]=[]
  username: string = '';
  userItems: any[] = [];
  otherUsersItems: any[] = [];
  showNewItem = false;

  constructor(private router: Router, private apiService: ApiService, private itemService: ItemserviceService) {}

  ngOnInit() {
    this.apiService.getDashboardData().subscribe({
      next: response => { 
        this.username = response.username;
        this.userItems = response.user_items;
        this.otherUsersItems = response.other_users_items;
      },
      error: error=> {
        console.log("here is the error, here you are, ",error);
        // Handle any error during dashboard data retrieval
      }}
    );
  }

  logout() {
    this.apiService.logout().subscribe({
      next:
      () => {
        
        this.router.navigate(['/login']);
      },
      error:error => {
        console.log(error);
        // Handle any error during logout
      }
    });
  }


  fetchItems() {
    // Fetch the user's items using the item service
    this.itemService.getUserItems().subscribe({
     next: (response: any) => {
        this.items = response.items;
      },
     error: (error) => {
        console.log('Error fetching items:', error);
      }
  });
  }

  showNewItemForm() {
    this.showNewItem = true;
  }

  addItem(item: any) {
    this.items.push(item);
    this.showNewItem = false;
  }

  showAllItems(){
    this.itemService.showAll().subscribe({
      next:(response:any)=>{
        this.items = response.items
      },
      error:(error)=>{
        console.log('error by showing all items', error)
      }
    })
  }

}
  


